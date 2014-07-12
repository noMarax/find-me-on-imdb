function FilmController($scope, $http) {
    
    $scope.films = [];

    /* 
    	Function getting every movie with "value" in it's title
    
    => be careful, you can't look for part of a word
    => eg : "Forre" or "Forrest Gu" doesn't work, while "Forrest" gives you "Forrest Gump"
    */
    $scope.getFilms = function(value) {
        $http({method: 'GET', url: 'http://www.omdbapi.com/?s='+value+'&plot=full&tomatoes=true'})
            .success(function(data, status) {
            	if (data.Response == "False" && value.length != 0) {
            		// not found
            		document.getElementById("film-list").style.display="none";
                	document.getElementById("film-list-error").style.display="none";
                	document.getElementById("film-list-not-found").style.display="block";
            	} else {
            		// found
            		document.getElementById("film-list").style.display="block";
                	document.getElementById("film-list-error").style.display="none";
                	document.getElementById("film-list-not-found").style.display="none";
            		$scope.films = data;
            	}
            })
            .error(function(data, status) {
            	// GET gives an error
            	document.getElementById("film-list").style.display="none";
                document.getElementById("film-list-error").style.display="block";
                document.getElementById("film-list-not-found").style.display="none";
            });
    };
}