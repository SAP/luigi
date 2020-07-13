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
	$ice-blue: #edf2f7;

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
			max-width: 1500px;

			@media screen and (min-width: (1024px - $side-nav-width)) {
				padding: 50px 80px;
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

		blockquote {
			padding: 20px;
			border-radius: 6px;
			p {
				padding: 0;
				margin: 0;
			}
		}

		blockquote.success,
		blockquote.warning {
			position: relative;
			padding-left: 60px;
			p {
				padding: 0;
				margin: 0;
			}
			&::before {
				content: "";
				position: absolute;
				display: block;
				width: 24px;
				height: 24px;
				top: 20px;
				left: 20px;
				background-position: center center;
				background-size: contain;
				background-repeat: no-repeat;
			}
		}

		blockquote.success {
			background-color: rgba(45, 235, 138, 0.08);

			&::before {
				background-image: url('images/icon_info.svg');
			}
		}

		blockquote.warning {
			background-color: rgba(247, 216, 96, 0.08);

			&::before {
				background-image: url('images/icon_alert.svg');
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
				right: 0;
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
				&:before,
				&:after {
					content: ' ';
					position: absolute;
					bottom: 100%;
					width: 0;
					height: 0;
				}

				&:before {
					right: 2px;
					border: 10px solid transparent;
					border-bottom-color: $primary-color;
				}

				// cutout
				&:after {
					right: 3px;
					border: 9px solid transparent;
					border-bottom-color: white;
					background-color: transparent;
				}

				@media screen and (min-width: (1024px - $side-nav-width)) {

					left: 50%;
					right: auto;
					transform: translateX(-50%);

					&:before {
						left: 34px;
						right: auto;
					}

					&:after {
						left: 35px;
						right: auto;
					}
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
					bottom: -36px;
					font-family: 'Open Sans', sans-serif;
					display: none;
					font-size: 11px;
					line-height: 13px;
					color: $secondary-color;
					background-color: white;
					border: 1px $primary-color solid;
					padding: 5px 11px;
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

		.accordion-container {

			margin: 30px 0;

			@media screen and (min-width: (1024px - $side-nav-width)) {
				margin: 50px 0;
			}

			.accordion-item {

				margin-bottom: 12px;
				border: 1px solid $powder-blue;
				position: relative;

				&.active {
					.accordion-item-content {
						display: block;
					}
					.accordion-item-title {
						background-color: $ice-blue;
						&:after {
							top: 16px;
							content: '\2013';
						}
					}
				}
			}

			.accordion-item-title {
				padding: 18px 80px 18px 20px;
				cursor: pointer;
				&:after {
					display: block;
					position: absolute;
					top: 18px;
					right: 21px;
					content: '+';
					color: $primary-color;
					font-size: 28px;
				}

				h3 {
					font-size: 16px;
					line-height: 28px;
					margin: 0;
					font-weight: 600;
				}
			}

			.accordion-item-content {
				display: none;
				margin: 0;
				padding: 18px 20px;

				p {

					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
		.keyword-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: start;
			margin-bottom: 38px;
		}
		label.keyword {
			border: 1px solid $powder-blue;
			padding: 0 14px;
			font-size: 14px;
			background-color: rgba(237, 242, 247, 0.1);
			border-radius: 6px;
			margin-right: 10px;
		}
	}
</style>

<main>
		<div class="docu-content">
		<slot></slot>
		</div>
</main>
