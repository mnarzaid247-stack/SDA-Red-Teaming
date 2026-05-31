class BaseModel:
    def generate(self, prompt):
        raise NotImplementedError("Subclasses must implement generate()")
    # يوحد شكل النماذج