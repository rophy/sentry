FROM getsentry/sentry:23.6.1

RUN apt-get update && apt-get install -y \
    git vim \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

COPY src /usr/local/lib/python3.8/site-packages/

COPY patches /tmp/patches
RUN cd /usr/local/lib/python3.8/site-packages/sentry/ \
    && /tmp/patches/init.sh \
    && /tmp/patches/apply.sh
