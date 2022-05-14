<template>
	<div>
		<router-view />
	</div>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

/* 滚动条样式，兼容：google、QQ浏览器(其他浏览器未测) */
.scrollbar::-webkit-scrollbar {
	width: 5px;
}
.scrollbar::-webkit-scrollbar-thumb {
	width: 3px;
	background-color: #ccc;
	border-radius: 35px;
}
.scrollbar::-webkit-scrollbar-track {
	border: 1px solid #f1f1f1;
	box-shadow: 0 0 2px #eee inset;
}

</style>
