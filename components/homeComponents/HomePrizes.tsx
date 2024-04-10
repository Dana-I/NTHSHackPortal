import HomePrizesCard from './HomePrizesCard';

export default function HomePrizes() {
  return (
    <section className="w-full">
      {/* Banner */}
      <div
        className="my-6 -rotate-[4deg] bg-[#7B81FF] text-white p-3 w-lvw"
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {Array.apply(null, Array(200))
          .map(() => 'PRIZES')
          .join(' ')}
      </div>
      {/* Component */}
      <div className="md:py-12 py-6 xl:w-9/10 w-11/12 m-auto">
        <h1 className="mt-[100px] text-3xl text-center font-bold text-[#05149C]">Prizes</h1>
        <p className="text-center">Potential prize that participants can win!</p>
        <div className="md:grid md:grid-cols-3 flex flex-col gap-x-6 gap-y-[140px] mt-6">
          {/* TODO: Remove hardcoded value */}
          {[
            { rank: 0, prizeName: 'Test Prize' },
            { rank: 1, prizeName: 'Test Second Prize' },
            { rank: 2, prizeName: 'Test Third Prize' },
          ].map((prize, idx) => (
            <HomePrizesCard key={idx} prize={prize} blockType={idx % 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
