'use client';

import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { runDiagnostics } from '@/lib/utils/diagnostics';

export const DiagnosticsButton: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [running, setRunning] = useState(false);

  const handleRunDiagnostics = async () => {
    setRunning(true);
    try {
      // Run in console for detailed logs
      console.log('='.repeat(50));
      const diagnostics = await runDiagnostics();
      console.log('='.repeat(50));
      
      setResults(diagnostics);
      setShowModal(true);
    } catch (error) {
      console.error('Error running diagnostics:', error);
      alert('Failed to run diagnostics. Check console for details.');
    } finally {
      setRunning(false);
    }
  };

  const getStatusIcon = (success: boolean) => {
    return success ? '✅' : '❌';
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleRunDiagnostics}
        loading={running}
      >
        <Activity className="w-4 h-4" />
        Run Diagnostics
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="System Diagnostics"
        size="md"
      >
        {results && (
          <div className="space-y-4">
            {/* Firebase Config */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {getStatusIcon(results.config.valid)} Firebase Configuration
              </h3>
              {results.config.valid ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  All environment variables configured correctly
                </p>
              ) : (
                <div className="text-sm text-red-600 dark:text-red-400">
                  <p className="font-medium mb-1">Issues found:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {results.config.errors.map((err: string, i: number) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Authentication */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {getStatusIcon(results.auth.authenticated)} Authentication
              </h3>
              {results.auth.authenticated ? (
                <div className="text-sm space-y-1">
                  <p className="text-green-600 dark:text-green-400">
                    Signed in as: {results.auth.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    User ID: {results.auth.uid}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-red-600 dark:text-red-400">
                  Not authenticated. Please sign in with Google.
                </p>
              )}
            </div>

            {/* Firestore */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {getStatusIcon(results.firestore.success)} Firestore Database
              </h3>
              {results.firestore.success ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Connection successful
                </p>
              ) : (
                <div className="text-sm text-red-600 dark:text-red-400">
                  <p className="font-medium">Connection failed</p>
                  <p className="mt-1">Error: {results.firestore.error}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Check Firestore security rules and permissions
                  </p>
                </div>
              )}
            </div>

            {/* Storage */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                {getStatusIcon(results.storage.success)} Firebase Storage
              </h3>
              {results.storage.success ? (
                <p className="text-sm text-green-600 dark:text-green-400">
                  Connection successful
                </p>
              ) : (
                <div className="text-sm text-red-600 dark:text-red-400">
                  <p className="font-medium">Connection failed</p>
                  <p className="mt-1">Error: {results.storage.error}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Check Firebase Storage is enabled and rules are configured
                  </p>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> Check the browser console (F12) for detailed diagnostic logs.
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
                📖 For troubleshooting steps, see <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">TROUBLESHOOTING_SAVE_ERROR.md</code>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
