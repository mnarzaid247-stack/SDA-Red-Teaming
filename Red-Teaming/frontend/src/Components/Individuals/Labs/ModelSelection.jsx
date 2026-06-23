/**
 * [ architectural concept ]: hybrid configuration layer managing pre-configured and user-defined state options.
 * [ purpose ]: acts as an isolated orchestrator for model workspace selection, providing instant integration for standard platform llms while capturing external network connection keys and endpoints through contextual input routing.
 */

import React, { useState } from 'react';
import ModelCard from './ModelCard';

// 1. DATA CONFIG: production readiness baseline dataset cataloging native available language models
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
  // 2. STATE REPLICAS: local ephemeral storage holding input parameters before propagation
  const [endpointUrl, setEndpointUrl] = useState('');
  const [apiKey, setApiKey] = useState('');

  // 3. MUTATION ROUTINE: interceptor pattern that bundles localized input data back into the global state stream
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

  // 4. MAIN VIEWPORT RESOLUTION: responsive catalog distribution layout
  return (
    <div className="space-y-6">

      {/* NODE: structural selection matrix combining built-in models and the custom entry card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {BUILT_IN_MODELS.map((model) => (
          <ModelCard
            key={model.id}
            {...model}
            isSelected={selectedModel?.id === model.id}
            onClick={() => onSelect(model)}
          />
        ))}

        {/* inline manual initialization node for external endpoint context */}
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

        {/* NODE: progressive disclosure boundary - renders input field configurations only when target selection matches custom identifier */}      {selectedModel?.id === 'user' && (
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

          {/* infrastructure access details collection fieldset */}
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
              "/>

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

          {/* transactional confirmation submit execution trigger */}
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