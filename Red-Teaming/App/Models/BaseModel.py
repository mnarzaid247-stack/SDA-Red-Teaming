class BaseModel:
    def generate(self, prompt):
        raise NotImplementedError("Subclasses must implement generate()")
    