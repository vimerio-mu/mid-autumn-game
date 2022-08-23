<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef H5
			console.log('h5环境')
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// #ifdef H5
	body::-webkit-scrollbar,html::-webkit-scrollbar {
	    display: none;
	}
	scroll-view ::-webkit-scrollbar {  
	
	    display: none !important;  
	
	    width: 0 !important;  
	
	    height: 0 !important;  
	
	    -webkit-appearance: none;  
	
	    background: transparent;  
	
	}
	// #endif
</style>
