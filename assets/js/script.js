$(document).ready(function () {

/*-------------load projects from JSON----------*/

	function template(val,id){
		return `
	<div class="col-md-${val.column}">
        <a href="#popup-${id}" class="open-popup-link">
            <div>
            	<h3>${val.title}</h3>
            </div>
            <img src="images/${val.img}" class="img-responsive" alt="Responsive image">
        </a>
	    
	    <div id="popup-${id}" class="white-popup mfp-hide">
            <div class="col-md-8">
                <img src="images/${val.img}" class="img-responsive" alt="Responsive image">
            </div>
            <div class="col-md-4">
                <div>
                    <h2 class="popup-head">${val.title}</h2>
                </div>
                <div>
                    ${val.description}
                    <a target="_blank" href="${val.url}" class="btn">Try Here <span class="glyphicon glyphicon-new-window"></span></a>
                </div>
            </div>
        </div>
	</div>
	  	`
	}

	$.getJSON( "data.json", function( data ) {
		
		let id=0;
		$.each( data, function(k,v){

			let items = [[],[]];

			$.each( v , function(key,val){
				if(val.column===6){
					items[0].push(template(val,id));
				}
				else{
					items[1].push(template(val,id));
				}
				id++;
			});

			$(items[0].join( "" )).appendTo( `#${k} .big` );
			$(items[1].join( "" )).appendTo( `#${k} .small` );
		});

	//Adjust for scroll bar width
    var outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
        scroll_width =(100- $('<div>').css({width: '100%'}).appendTo(outer).outerWidth());
    outer.remove();
    $('.white-popup').css('max-width',(800+scroll_width)*3/2);

	//popup
	$('.open-popup-link').magnificPopup({
		  type:'inline',
		  midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
		  gallery:{
		    enabled:true
		  }
		});
	});



	//To resume Heroku server from sleep upon page load
	(new Image()).src = "https://voteplexproject.herokuapp.com/static/img/add.png?t=" + +new Date();
	(new Image()).src = "https://dj-blog-app.herokuapp.com/static/img/ping.png?t=" + +new Date();

});

