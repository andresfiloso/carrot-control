from flask import Flask, render_template, redirect, session, url_for, request, flash
import json
import time

app = Flask(__name__)


@app.route('/')
def default():
	return redirect(url_for('home'), code=307)

@app.route('/home')
def home():

    commits = json.loads(open('config.json', 'r').read())

    return render_template('index.html', **locals())

@app.route('/commit')
def commit():
    query = request.args.get('q')
    commits = json.loads(open('config.json', 'r').read())
    commit = [commit for commit in commits if commit['commit'] == query][0]
    result = {}


    for idx, commit in enumerate(commits):
        if commit['commit'] == query:
            result = commit
            try:
                result['previous'] = commits[idx-1]
            except IndexError:
                result['previous'] = None
            try:
                result['next'] = commits[idx+1]
            except IndexError:
                result['next'] = None
            
    commit = result

    return render_template('commit.html', **locals())

@app.route('/element')
def element():
    element = request.args.get('q')
    commits = json.loads(open('config.json', 'r').read())
    return render_template('file.html', **locals())

if __name__ == '__main__':
    app.run()