exports.home = (req, res) => {
    res.render('home', {title: 'Accueil'});
}

exports.connexion = (req, res) => {
    res.render('connexion', { title: 'Connexion', layout: 'connexion' });
}

exports.contact = (req, res) => {
    res.render('contact', { title: 'Contact', layout: "contact" });
}

exports.admin = (req, res) => {
    res.render('admin', { title: 'admin', layout: "admin", db: 'data' });
}

exports.profil = (req, res) => {
    res.render('profil', { title: 'Profil', layout: 'profil'});
}

exports.Creationcours = (req, res) => {
    res.render('Creationcours', { title: 'Création d\'un cours', layout: "Creationcours", db: 'data' });
}

exports.inscription = (req, res) => {
    res.render('inscription', { title: 'Inscription', layout: 'inscription' });
}

exports.seeCourses = (req, res) => {
    res.render('seeCourses', { title: 'Cours', layout: "cours", db:'data' });
}

exports.user = (req, res) => {
    res.render('user', { title: 'Utilisateur', layout: "user" });
}

exports.mdpOublie = (req, res) => {
    res.render('mdpOublie', { title: 'mdpOublie', layout: 'mdpOublie' });
}

