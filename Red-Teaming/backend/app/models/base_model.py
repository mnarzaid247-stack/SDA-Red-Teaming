# Base Model Interface
# ----------------------------------------------------------
# Defines the common interface that all AI model integrations
# must implement. Every model must provide a generate()
# method so the rest of the system can interact with models
# in a consistent way.
# ==========================================================

# Base class for all supported AI models.
class BaseModel:
# Generates a response from the target model using the provided prompt.
    def generate(self, prompt):
        raise NotImplementedError("Subclasses must implement generate()")
