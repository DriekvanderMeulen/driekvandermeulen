import Shuffle from '@/components/landing/bits/shuffle'

const Hero = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center px-4 select-none">
			<div className="max-w-4xl text-center">
				<div className="mb-12">
					<Shuffle
						text="DRIEK STUDIO"
						shuffleDirection="right"
						duration={1.5}
						animationMode="evenodd"
						shuffleTimes={1}
						ease="power3.out"
						stagger={0.2}
						loop={true}
						loopDelay={1}
						className="text-pure-white"
					/>
				</div>
				<h3 className="h3 mb-8 text-center text-almost-white">
					Where <span className="text-studio">creative design</span> meets{' '}
					<span className="text-studio">thoughtful engineering</span>
				</h3>

				<p className="p m-0 text-center text-sm tracking-wide text-not-white">
					This site is a work in progress. Some quirks may appear.
				</p>
			</div>
		</div>
	)
}

export default Hero
