<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	@import "uview-ui/index.scss";
	page,uni-page-body,html,body{  
		height: 98%;
		background-color: white;
	}
	/*每个页面公共css */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>
