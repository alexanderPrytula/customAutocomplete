/* Custom Autocomplete */
	
	function autoComplete(input, arr) {
		
		// get default coords of input elem
		var initCoords = function coords( elem ) {
			return {
				left: elem.getBoundingClientRect().left,
				top: elem.getBoundingClientRect().top
			}
		}( input );
		
		// set Div styles
		var div = document.createElement('div');
		div.className = 'divPrompt';
		
		div.style.top = initCoords.top + input.clientHeight + 10 + 'px';
		div.style.left = initCoords.left + 'px';
		div.style.width = input.clientWidth + 'px';
		
		// set Ul styles
		var ul = document.createElement('ul');
		ul.className = 'ulPrompt';
		
		div.appendChild(ul);
	
		input.addEventListener('keyup', function() {
	
			var val = this.value;
			
			if( val.length < 3 ) return;
			
			// match ?
			var matchList = [];
			for(var i = 0; i<arr.length; i++) {
				if( arr[i].match( new RegExp( val, 'i' ) ) !== null ) {
					matchList.push( arr[i] );
				}
			}
			createList( matchList );
			
			 // has elems ?
			if( div.children[0].children.length ) {           
				div.classList.remove('prompt-off');
				input.insertAdjacentElement('afterEnd', div);
			}
			
			// click on item ?
			var lis = div.getElementsByTagName('li');
			[].forEach.call(lis, function(li) {
				li.addEventListener('click', function(ev) {
					
					div.classList.add('prompt-off');
					input.value = ev.target.innerHTML;
					
				});
			});
			
		});
		
		function createList( elemList ) {
			ul.innerHTML = '';
				
			elemList.forEach(function(elem) {
				var li = document.createElement('li');
				li.innerHTML = elem;
				ul.appendChild(li);
			});
		}
	
	};