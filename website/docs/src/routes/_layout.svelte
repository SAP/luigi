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

	:global(body *) {
		box-sizing: border-box;
	}

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

		.h2Wrapper {
			margin-top: 45px;
			padding-top: 40px;
			border-top: 1px solid $powder-blue;
		}

		.h3Wrapper {
			margin-top: 45px;
		}

		p,
		ol,
		ul,
		blockquote,
		h1, h2, h3, h4, h5 {
			margin: 0 0 15px;

			@media screen and (min-width: (1024px - $side-nav-width)) {
				margin: 0 0 25px;
			}
		}

		h1, h2, h3, h4, h5 {
			font-weight: 600;
		}

		h1 {
			font-size: 25px;
			line-height: 30px;

			@media screen and (min-width: (1024px - $side-nav-width)) {
				font-size: 35px;
				line-height: 40px;
			}
		}

		h2 {
			font-size: 20px;
			line-height: 22px;

			@media screen and (min-width: (1024px - $side-nav-width)) {
				font-size: 28px;
				line-height: 30px;
			}
		}

		h3 {
			font-size: 18px;
			line-height: 20px;

			@media screen and (min-width: (1024px - $side-nav-width)) {
				font-size: 18px;
				line-height: 28px;
			}
		}

		ul {
			list-style: none;
			padding: 0 0 0 15px;

			ul {
				margin-bottom: 0;
				padding-left: 0;
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
		}
		
		ol {
			padding: 0 0 0 18px;

			ol {
				margin-bottom: 0;
				padding-left: 0;
			}
		}

		strong {
			font-weight: 600;
		}

		a {
			color: $secondary-color;

			&:hover,
			&:active {
				color: $primary-color;
			}
		}

		.copyCodeContainer {
			position: relative;
		}

		.copyCode {
			position: absolute;
			right: -10px;
			top: -10px;
			width: 28px;
			height: 28px;
			border-radius: 50%;
			background-color: $primary-color;
			border: 1px $primary-color solid;
			box-shadow: 0 0 4px 0 $primary-color;
			cursor: pointer;
			& > div {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
				width: 100%;
			}
			img {
				width: 13px;
				height: 16px;
			}
			.popoverCopy {
				position: absolute;
				bottom: -37px;
				font-family: 'Open Sans', sans-serif;
				display: none;
				font-size: 11px;
				line-height: 13px;
				color: $secondary-color;
				background-color: white;
				border: 1px $primary-color solid;
				padding: 5px 11px;
				white-space: nowrap;
				// Arrow needs to be added
				&:before {
					content: ' ';
					height: 0;
					width: 0;
					position: absolute;
					bottom: 100%;
					left: 34px;
					width: 0;
					height: 0;
					border: 10px solid transparent;
					border-bottom-color: $primary-color;
				}
				// cutout
				&:after {
					content: ' ';
					height: 0;
					width: 0;
					position: absolute;
					bottom: 100%;
					left: 35px;
					width: 0;
					height: 0;
					border: 9px solid transparent;
					border-bottom-color: white;
					background-color: transparent;
				}
			}
			&:hover {
				background-color: white;
				border-color: $primary-color;
				.popoverCopy {
					display: block;
				}
			}
		}

		pre {
			width: 100%;
			display: block;
			width: 1px;
			min-width: 100%;
			*width: 100%;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			border: 1px solid $powder-blue;
			background-color: rgba(237, 242, 247, 0.1);
			padding: 25px;
			box-sizing: border-box;
			border-radius: 6px;
			margin-bottom: 40px;

			code {
				overflow-x: auto;
				word-break: normal;
				white-space: pre;
				overflow-wrap: normal;
				background: none;
				border-radius: 0;
				padding: 0;
			}
		}

		img {
			display: inline-block;
			max-width: 100%;
			border: none;
		}

		code {
			width: 100%;
			white-space: pre-wrap;
			overflow-wrap: break-word;
			background-color: rgba(27, 31, 35, 0.05);
			padding: 0.2em 0.4em;
			margin: 0px;
			border-radius: 3px;
			font-size: 14px;
		}
	}
</style>

<main>
		<div class="docu-content">
		<slot></slot>
		</div>
</main>