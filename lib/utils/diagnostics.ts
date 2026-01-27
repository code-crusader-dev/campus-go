// Diagnostic utilities to help troubleshoot setup issues

/**
 * Check Firebase configuration
 */
export const checkFirebaseConfig = (): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  requiredEnvVars.forEach((varName) => {
    const value = process.env[varName];
    if (!value || value.includes('your_') || value.includes('xxxxx')) {
      errors.push(`${varName} is missing or not configured`);
    }
  });

  if (!process.env.NEXT_PUBLIC_ADMIN_EMAILS) {
    errors.push('NEXT_PUBLIC_ADMIN_EMAILS is not configured');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Get current authentication status
 */
export const getAuthStatus = async () => {
  try {
    const { auth } = await import('@/lib/firebase/config');
    const user = auth.currentUser;
    
    return {
      authenticated: !!user,
      email: user?.email || null,
      uid: user?.uid || null,
      displayName: user?.displayName || null,
    };
  } catch (error) {
    return {
      authenticated: false,
      email: null,
      uid: null,
      displayName: null,
      error: 'Failed to check auth status',
    };
  }
};

/**
 * Check if user is admin
 */
export const checkAdminStatus = (email: string): boolean => {
  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);
  
  return adminEmails.includes(email);
};

/**
 * Test Firestore connection
 */
export const testFirestoreConnection = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { db } = await import('@/lib/firebase/config');
    const { collection, getDocs, limit, query } = await import('firebase/firestore');
    
    // Try to read from projects collection
    const q = query(collection(db, 'projects'), limit(1));
    await getDocs(q);
    
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.code || error.message || 'Unknown error',
    };
  }
};

/**
 * Test Storage connection
 */
export const testStorageConnection = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { storage } = await import('@/lib/firebase/config');
    const { ref, listAll } = await import('firebase/storage');
    
    // Try to list storage root
    const storageRef = ref(storage);
    await listAll(storageRef);
    
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.code || error.message || 'Unknown error',
    };
  }
};

/**
 * Run all diagnostics
 */
export const runDiagnostics = async () => {
  console.log('🔍 Running Campus Go Diagnostics...\n');
  
  // Check Firebase Config
  console.log('1️⃣ Checking Firebase Configuration...');
  const configCheck = checkFirebaseConfig();
  if (configCheck.valid) {
    console.log('   ✅ Firebase configuration is valid');
  } else {
    console.log('   ❌ Firebase configuration has issues:');
    configCheck.errors.forEach(err => console.log(`      - ${err}`));
  }
  
  // Check Authentication
  console.log('\n2️⃣ Checking Authentication Status...');
  const authStatus = await getAuthStatus();
  if (authStatus.authenticated) {
    console.log(`   ✅ Authenticated as: ${authStatus.email}`);
    console.log(`   User ID: ${authStatus.uid}`);
    
    const isAdmin = checkAdminStatus(authStatus.email || '');
    if (isAdmin) {
      console.log('   ✅ User has admin privileges');
    } else {
      console.log('   ⚠️  User does NOT have admin privileges');
      console.log('   Check NEXT_PUBLIC_ADMIN_EMAILS in .env.local');
    }
  } else {
    console.log('   ❌ Not authenticated');
    if (authStatus.error) {
      console.log(`   Error: ${authStatus.error}`);
    }
  }
  
  // Check Firestore Connection
  console.log('\n3️⃣ Testing Firestore Connection...');
  const firestoreTest = await testFirestoreConnection();
  if (firestoreTest.success) {
    console.log('   ✅ Firestore connection successful');
  } else {
    console.log('   ❌ Firestore connection failed');
    console.log(`   Error: ${firestoreTest.error}`);
  }
  
  // Check Storage Connection
  console.log('\n4️⃣ Testing Firebase Storage...');
  const storageTest = await testStorageConnection();
  if (storageTest.success) {
    console.log('   ✅ Firebase Storage connection successful');
  } else {
    console.log('   ❌ Firebase Storage connection failed');
    console.log(`   Error: ${storageTest.error}`);
  }
  
  // Summary
  console.log('\n📊 Diagnostic Summary:');
  const allChecks = [
    configCheck.valid,
    authStatus.authenticated,
    firestoreTest.success,
    storageTest.success,
  ];
  const passed = allChecks.filter(Boolean).length;
  
  console.log(`   ${passed}/4 checks passed`);
  
  if (passed === 4) {
    console.log('\n✅ All checks passed! Your setup looks good.');
  } else {
    console.log('\n⚠️  Some checks failed. See details above.');
    console.log('\n📖 For help, check: TROUBLESHOOTING_SAVE_ERROR.md');
  }
  
  return {
    config: configCheck,
    auth: authStatus,
    firestore: firestoreTest,
    storage: storageTest,
  };
};

/**
 * Print diagnostic help
 */
export const printDiagnosticHelp = () => {
  console.log('🆘 Campus Go Diagnostic Tool\n');
  console.log('Run diagnostics by opening browser console (F12) and typing:');
  console.log('');
  console.log('  import { runDiagnostics } from "./lib/utils/diagnostics";');
  console.log('  runDiagnostics();');
  console.log('');
  console.log('Or add this button to your admin page for easy testing.');
};