

function displayContent( content ) {
	document.getElementById( content ).style.display = 'block';
	if( content === 'lightsContent' ) {
		document.getElementById( 'p5canvas' ).style.display = 'block';
	}
	if( content !== 'lightsContent' ) {
		document.getElementById( 'lightsContent' ).style.display = 'none';
	}
	if( content !== 'seatsContent' ) {
		document.getElementById( 'seatsContent' ).style.display = 'none';
	}
	if( content !== 'signsContent' ) {
		document.getElementById( 'signsContent' ).style.display = 'none';
	}
	if( content !== 'homeContent' ) {
		document.getElementById( 'homeContent' ).style.display = 'none';
	}
	reset();
}

