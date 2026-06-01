from datetime import datetime
#تخزين وقت التنفيذ 

class ResultCollector:

    def __init__(self):
        self.results = []

    def add_result(
        self,
        model_name,
        category,
        prompt,
        response
    ):

        self.results.append({
            "model": model_name,
            "category": category,
            "prompt": prompt,
            "response": response,
            "timestamp":
                datetime.now().strftime(
                     "%Y-%m-%d %H:%M:%S"
                )
        })

    def get_results(self):
        return self.results
    

    #Store Timestamp لوقت الهجمة ووقت الرد عشان بعدين نظهرها بالداشبورد 