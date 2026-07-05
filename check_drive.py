import urllib.request
url = 'https://drive.google.com/uc?id=1f2O-zk3s6ZBqqoq2jOpwOxouErCOlyxV'
try:
    response = urllib.request.urlopen(url)
    html = response.read().decode('utf-8')
    if 'html' in html.lower():
        print('Returned HTML page (likely permission denied or virus warning).')
        if 'virus' in html.lower() or 'too large' in html.lower() or 'confirm=' in html.lower():
            print('Virus warning detected.')
        else:
            print('Permission denied or other HTML page.')
except Exception as e:
    print(f'Error: {e}')
