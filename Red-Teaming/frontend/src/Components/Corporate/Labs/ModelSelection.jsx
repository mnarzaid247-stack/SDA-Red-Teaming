import React, { useState } from 'react';
import ModelCard from './ModelCard';

const BUILT_IN_MODELS = [
  {
    id: 'gpt',
    name: 'GPT',
    provider: 'OpenAI • Native Integration',
    icon: 'api'
  },
  {
    id: 'gemma',
    name: 'Gemma',
    provider: 'Google • Open Model',
    icon: 'psychology'
  },
  {
    id: 'llama',
    name: 'Llama',
    provider: 'Meta • Foundation Model',
    icon: 'memory'
  }
];

const ModelSelection = ({ selectedModel, onSelect }) => {
  const [endpointUrl, setEndpointUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleCustomSelect = () => {
    onSelect({
      id: 'user',
      name: 'Custom Model',
      provider: 'External Endpoint',
      icon: 'upload_file',
      endpoint_url: endpointUrl,
      api_key: apiKey
    });
  };

  return (
    <div className="space-y-6">

      {/* MODELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {BUILT_IN_MODELS.map((model) => (
          <ModelCard
            key={model.id}
            {...model}
            isSelected={selectedModel?.id === model.id}
            onClick={() => onSelect(model)}
          />
        ))}

        {/* CUSTOM MODEL CARD */}
        <ModelCard
          id="user"
          name="Custom"
          provider="External Endpoint"
          icon="upload_file"
          isSelected={selectedModel?.id === 'user'}
          onClick={() =>
            onSelect({
              id: 'user',
              name: 'Custom Model',
              provider: 'External Endpoint',
              icon: 'upload_file'
            })
          }
        />

      </div>

      {/* CUSTOM CONFIG PANEL (ONLY WHEN SELECTED) */}
      {selectedModel?.id === 'user' && (
        <div className="
          bg-surface-container-low
          border border-outline-variant
          rounded-2xl
          p-6
          animate-in fade-in duration-300
        ">

          <h3 className="text-title-md text-on-surface mb-4">
            User Model Configuration
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              placeholder="Endpoint URL"
              value={endpointUrl}
              onChange={(e) => setEndpointUrl(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-surface-container
                border border-outline-variant
                text-sm
              "
            />

            <input
              type="password"
              placeholder="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="
                w-full
                p-3
                rounded-xl
                bg-surface-container
                border border-outline-variant
                text-sm
              "
            />

          </div>

          <button
            onClick={handleCustomSelect}
            className="
              mt-4
              w-full
              bg-primary
              text-black
              rounded-xl
              py-3
              font-semibold
              transition-all
            "
          >
            User Model
          </button>

        </div>
      )}

    </div>
  );
};

export default ModelSelection;