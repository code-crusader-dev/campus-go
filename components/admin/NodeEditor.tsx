'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Save, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Node, Direction } from '@/types';
import { generateId } from '@/lib/utils/helpers';
import { uploadNodeImage } from '@/lib/firebase/storage';

interface NodeEditorProps {
  nodes: Node[];
  projectId: string;
  onNodesChange: (nodes: Node[]) => void;
  onStartNodeChange: (nodeId: string) => void;
  startNodeId?: string;
}

export const NodeEditor: React.FC<NodeEditorProps> = ({
  nodes,
  projectId,
  onNodesChange,
  onStartNodeChange,
  startNodeId,
}) => {
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<{ nodeId: string; direction: Direction } | null>(null);
  const [uploading, setUploading] = useState(false);

  // Node form state
  const [nodeForm, setNodeForm] = useState<{
    image: File | string | null;
    title: string;
  }>({
    image: null,
    title: '',
  });

  const openCreateModal = () => {
    setNodeForm({ image: null, title: '' });
    setEditingNode(null);
    setIsCreating(true);
  };

  const openEditModal = (node: Node) => {
    setNodeForm({ image: node.image, title: node.title || '' });
    setEditingNode(node);
    setIsCreating(true);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingNode(null);
    setNodeForm({ image: null, title: '' });
  };

  const handleSaveNode = async () => {
    if (!nodeForm.image) {
      alert('Please add an image');
      return;
    }

    try {
      setUploading(true);

      let imageUrl = typeof nodeForm.image === 'string' ? nodeForm.image : '';
      
      // Upload image if it's a file
      if (nodeForm.image instanceof File) {
        const nodeId = editingNode?.id || generateId();
        imageUrl = await uploadNodeImage(nodeForm.image, projectId, nodeId);
      }

      if (editingNode) {
        // Update existing node
        const updatedNodes = nodes.map(n =>
          n.id === editingNode.id
            ? { ...n, image: imageUrl, title: nodeForm.title }
            : n
        );
        onNodesChange(updatedNodes);
      } else {
        // Create new node
        const newNode: Node = {
          id: generateId(),
          image: imageUrl,
          title: nodeForm.title,
          connections: {},
        };
        onNodesChange([...nodes, newNode]);
        
        // Set as start node if it's the first node
        if (nodes.length === 0) {
          onStartNodeChange(newNode.id);
        }
      }

      closeModal();
    } catch (error) {
      console.error('Error saving node:', error);
      alert('Failed to save node');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (confirm('Are you sure you want to delete this node?')) {
      // Remove the node
      const updatedNodes = nodes.filter(n => n.id !== nodeId);
      
      // Remove all connections to this node
      updatedNodes.forEach(node => {
        Object.keys(node.connections).forEach(dir => {
          const direction = dir as Direction;
          if (node.connections[direction] === nodeId) {
            delete node.connections[direction];
          }
        });
      });
      
      onNodesChange(updatedNodes);
      
      // Update start node if necessary
      if (startNodeId === nodeId && updatedNodes.length > 0) {
        onStartNodeChange(updatedNodes[0].id);
      }
      
      setSelectedNode(null);
    }
  };

  const startConnection = (nodeId: string, direction: Direction) => {
    setConnectingFrom({ nodeId, direction });
  };

  const completeConnection = (targetNodeId: string) => {
    if (!connectingFrom) return;

    const { nodeId: sourceNodeId, direction } = connectingFrom;
    
    // Don't allow self-connections
    if (sourceNodeId === targetNodeId) {
      alert('Cannot connect a node to itself');
      setConnectingFrom(null);
      return;
    }

    // Update source node connection
    const updatedNodes = nodes.map(node => {
      if (node.id === sourceNodeId) {
        return {
          ...node,
          connections: {
            ...node.connections,
            [direction]: targetNodeId,
          },
        };
      }
      return node;
    });

    onNodesChange(updatedNodes);
    setConnectingFrom(null);
  };

  const removeConnection = (nodeId: string, direction: Direction) => {
    const updatedNodes = nodes.map(node => {
      if (node.id === nodeId) {
        const newConnections = { ...node.connections };
        delete newConnections[direction];
        return { ...node, connections: newConnections };
      }
      return node;
    });

    onNodesChange(updatedNodes);
  };

  const getConnectionTarget = (nodeId: string, direction: Direction): Node | null => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return null;
    
    const targetId = node.connections[direction];
    if (!targetId) return null;
    
    return nodes.find(n => n.id === targetId) || null;
  };

  const directionIcons = {
    up: ArrowUp,
    down: ArrowDown,
    left: ArrowLeft,
    right: ArrowRight,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Node Editor
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'} created
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-4 h-4" />
          Add Node
        </Button>
      </div>

      {/* Connection mode indicator */}
      {connectingFrom && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-primary-100 dark:bg-primary-900 rounded-lg border-2 border-primary-500"
        >
          <p className="text-sm font-medium text-primary-900 dark:text-primary-100">
            <strong>Connection Mode:</strong> Click on a node to connect it to the{' '}
            <strong>{connectingFrom.direction}</strong> direction
          </p>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setConnectingFrom(null)}
            className="mt-2"
          >
            Cancel
          </Button>
        </motion.div>
      )}

      {/* Nodes grid */}
      {nodes.length === 0 ? (
        <Card className="p-12 text-center">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No nodes yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first node to start building the navigation experience
          </p>
          <Button onClick={openCreateModal}>
            <Plus className="w-5 h-5" />
            Create First Node
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node, index) => {
            const isStartNode = node.id === startNodeId;
            const isSelected = node.id === selectedNode;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`overflow-hidden transition-all ${
                    isSelected ? 'ring-2 ring-primary-500' : ''
                  } ${
                    connectingFrom ? 'cursor-pointer hover:ring-2 hover:ring-primary-300' : ''
                  }`}
                  onClick={() => {
                    if (connectingFrom) {
                      completeConnection(node.id);
                    } else {
                      setSelectedNode(isSelected ? null : node.id);
                    }
                  }}
                >
                  {/* Node image */}
                  <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                    <img
                      src={node.image}
                      alt={node.title || 'Node'}
                      className="w-full h-full object-cover"
                    />
                    {isStartNode && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
                        START
                      </div>
                    )}
                  </div>

                  {/* Node info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {node.title || 'Untitled Node'}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ID: {node.id.slice(0, 8)}
                        </p>
                      </div>
                      <div className="flex gap-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(node);
                          }}
                          className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNode(node.id);
                          }}
                          className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </div>

                    {/* Connections */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Connections:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {(['up', 'down', 'left', 'right'] as Direction[]).map((direction) => {
                          const Icon = directionIcons[direction];
                          const target = getConnectionTarget(node.id, direction);

                          return (
                            <div key={direction} className="flex items-center gap-1">
                              {target ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeConnection(node.id, direction);
                                  }}
                                  className="flex-1 flex items-center gap-1 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800"
                                  title={`Connected to: ${target.title || 'Untitled'}`}
                                >
                                  <Icon className="w-3 h-3" />
                                  <span className="truncate flex-1">{direction}</span>
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startConnection(node.id, direction);
                                  }}
                                  className="flex-1 flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                  <Icon className="w-3 h-3" />
                                  <span>{direction}</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Set as start node */}
                    {!isStartNode && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onStartNodeChange(node.id);
                        }}
                        className="w-full mt-3"
                      >
                        Set as Start Node
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Node form modal */}
      <Modal
        isOpen={isCreating}
        onClose={closeModal}
        title={editingNode ? 'Edit Node' : 'Create Node'}
        size="md"
      >
        <div className="space-y-6">
          <ImageUpload
            label="Node Image"
            onImageSelected={(img) => setNodeForm({ ...nodeForm, image: img })}
            currentImage={typeof nodeForm.image === 'string' ? nodeForm.image : undefined}
          />

          <Input
            label="Node Title (Optional)"
            value={nodeForm.title}
            onChange={(e) => setNodeForm({ ...nodeForm, title: e.target.value })}
            placeholder="e.g., Main Entrance"
          />

          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={closeModal} disabled={uploading}>
              Cancel
            </Button>
            <Button onClick={handleSaveNode} loading={uploading}>
              <Save className="w-4 h-4" />
              {editingNode ? 'Save Changes' : 'Create Node'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
