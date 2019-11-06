<script>
	export let segment;
</script>

<style type="text/scss">

	@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Quicksand:500&display=swap');

	$primary-color: #2deb8a;
	$secondary-color: #3c4553;
	$light-gray: #e6e6e6;
	$medium-gray: #cacaca;
	$powder-blue: #d0d8e2;

	$side-nav-width: 320px;

	:global(body) {
		background-color: white;
		margin: 0;
		padding: 0;
		font-family: 'Open Sans', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 28px;
		color: $secondary-color;
		box-sizing: border-box;

		

		.docu-content {

			padding: 30px;
			font-size: 16px;

			@media screen and (min-width: (1024px - $side-nav-width)) {
				padding: 95px 80px;
			}
		}

		//Content styles

		p,
		ol,
		ul,
		blockquote,
		h1, h2, h3, h4 {
			margin: 0 0 25px;
		}

		h1, h2, h3, h4, h5 {
			font-weight: 600;
		}

		h1 {
			font-size: 35px;
			line-height: 40px;
		}

		h2 {
			font-size: 28px;
			line-height: 30px;
			margin-top: 40px;
			padding-top: 40px;
			border-top: 1px solid $powder-blue;
		}

		h3 {
			font-size: 18px;
			line-height: 28px;
		}

		ul {
			list-style: none;
		}

		li {

			list-style: none;

			&:before {
				content: '';
				width: 6px;
				height: 6px;
				border-radius: 50%;
				display: inline-block;
				background: $primary-color;
				vertical-align: middle;
				position: absolute;
				left: 0;
				top: 12px;
			}

			position: relative;
			padding-left: 20px;

		}

		strong {
			font-weight: 600;
		}

		a {
			color: $secondary-color;
		}

		pre {
			width: 100%;
			display: block;
			overflow-x: auto;
			border: 1px solid $powder-blue;
			background-color: rgba(237, 242, 247, 0.1);
			padding: 25px;
			box-sizing: border-box;
			border-radius: 6px;
			margin-bottom: 40px;
		}

		img {
			display: inline-block;
			max-width: 100%;
			border: none;
		}
	}
</style>

<main>
		<div class="docu-content">
		<slot></slot>
		</div>
</main>