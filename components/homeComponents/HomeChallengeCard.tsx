export default function HomeChallengesCard(props: { challenge: Challenge; blockType: number }) {
  const borderConfiguration = ['rounded-tr-[100px]', 'rounded-br-[100px]', 'rounded-tl-[100px]'];
  return (
    <div className="h-full w-full">
      <div className="mx-auto">
        {/* Block */}
        <div className={`bg-[#C1C8FF] ${borderConfiguration[props.blockType]} w-4/5 h-[200px]`}>
          &nbsp;
        </div>
        {/* Challenge Name */}
        <h1 className="text-2xl font-medium">{props.challenge.title.toUpperCase()}</h1>
        {/* Company Name */}
        <h1 className="text-xl text-[#05149C]">{props.challenge.organization}</h1>
        {/* Description */}
        <div className="mb-8">
          <p className="text-md line-clamp-5 text-balance">{props.challenge.description}</p>
        </div>
      </div>
    </div>
  );
}
