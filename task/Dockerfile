FROM python:3-alpine

WORKDIR "/app"

COPY . .

RUN pip install flask

RUN export FLASK_APP=app.py

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]