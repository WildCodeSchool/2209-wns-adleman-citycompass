import React from "react";
import "../styles/breadcrumbs.css";

function Hero({ heroContent, breadcrumbs }: any) {
	return (
		heroContent && (
			<div className="hero sm:h-screen flex flex-col sm:flex-row justify-start bg-cream">
				<div className="w-full sm:w-1/2 overflow-hidden">
					<img
						className="w-full sm:w-auto sm:max-w-none h-full"
						src={heroContent.picture}
						alt={heroContent.name + "picture"}
					/>
				</div>
				<div className="container w-full sm:w-1/2 px-6 sm:pr-9 flex flex-col justify-center sm:space-y-8 max-w-2xl">
					<div className="breadcrumbs hidden sm:flex">
						{breadcrumbs && (
							<div className="max-w-3xl">
								{breadcrumbs.map((breadcrumb: any) => (
									<a
										href={breadcrumb.href}
										className="text-xs text-darkBlue/30"
									>
										<span>{breadcrumb.title}</span>
									</a>
								))}
							</div>
						)}
					</div>
					<h1 className="drop-shadow-xl text-center sm:text-left">
						{heroContent.name}
					</h1>
					<p className="hidden sm:inline-block">{heroContent.description}</p>
				</div>
			</div>
		)
	);
}

export default Hero;
