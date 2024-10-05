FROM locustio/locust

COPY ./locust/locustfile.py /locust/locustfile.py

# Expose the Locust web interface
EXPOSE 8089

# Set the command to run Locust
CMD ["locust", "-f", "/locust/locustfile.py", "--host=http://172.20.0.10:8080"]
