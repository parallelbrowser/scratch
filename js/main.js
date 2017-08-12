const choo = require('choo')

var app = choo()
app.use(require('./stores/dbs'))
app.use(require('./stores/profiles'))
app.use(require('./stores/broadcasts'))
app.use(require('./stores/new-post'))
app.use(require('./stores/feed'))
app.route('/', require('./views/main'))
app.route('/profile/:key', require('./views/profile'))
app.route('/profile/:key/follows', require('./views/follows'))
app.route('/profile/:key/edit', require('./views/profile'))
app.route('/broadcast/*', require('./views/broadcast'))

// TCW -- new route for user workbench (for submitting scripts)

app.route('/workbench', require('./views/workbench'))

// TCW -- end

app.mount('main')
