//Get repositories data from Github API

jQuery.githubUser = function(username, callback) {
    jQuery.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback)
}

jQuery.fn.loadRepositories = function(username) {
    var target = this;
    target.html("<span>Querying GitHub for " + username + "'s repositories...</span>");

    $.githubUser(username, function(data) {
        var repos = data.data;
        sortByName(repos);

        var list = $('<dl/>');
        target.empty().append(list);

        $(repos).each(function() {
            if (this.name != (username.toLowerCase() + '.github.com')) {

                list.append('<dt><a href="' + (this.homepage ? this.homepage : this.html_url) + '"><strong>' + this.name + '</strong></a> <em>' + (this.language ? ('(' + this.language + ')') : '') + '</em><br/><span><strong>Forks:</strong> ' + this.forks + '</span></dt>');
                list.append('<dd>' + this.description + '</dd>');
            }
        });
    });

    function sortByName(repos) {
        repos.sort(function(a, b) {
            return b.forks - a.forks;
        });
    }
};

//Get contributors data

var table = [{
    "nickname": "John Doe",
    "team": "Support",
    "contributions": 6
}, {
    "nickname": "Private Gomer Pyle",
    "team": "Admins",
    "contributions": 4
}, {
    "nickname": "John Kowalski",
    "team": "LAC",
    "contributions": 10
}, {
    "nickname": "Forrest Gump",
    "team": "LAC",
    "contributions": 10
}, {
    "nickname": "David Bowman",
    "team": "Licstat",
    "contributions": 5
}, {
    "nickname": "Neo",
    "team": "LM-X",
    "contributions": 1
}, {
    "nickname": "Han Solo",
    "team": "Internal Systems",
    "contributions": 4
}, {
    "nickname": "Indiana Jones",
    "team": "LM-X",
    "contributions": 3
}, {
    "nickname": "Edward Scissorhands",
    "team": "Admins",
    "contributions": 3
}, {
    "nickname": "Tyler Durden",
    "team": "Licstat",
    "contributions": 7
}]

jQuery.fn.getContributors = function(data) {

    var contributionList = $('<dl/>');
    $("#github-contributors").append(contributionList);

    var sortByContribution = function() {
        table.sort(function(a, b) {
            return b.contributions - a.contributions;
        });

        $(table).each(function() {
            contributionList.append('<dt> <strong>Nickname:</strong> ' + this.nickname + ' <br/><span><strong>Contributions:</strong> ' + this.contributions + '</span></dt>');
            contributionList.append('<dd> <strong>Team:</strong> ' + this.team + '</dd>');
        });

    }
    sortByContribution();
};

$(function() {
    $("#github-projects").loadRepositories("x-formation");
    $("#github-contributors").getContributors();
});
