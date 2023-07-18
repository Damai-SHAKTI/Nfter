export default function NFTCard({ id, price, framePath }) {
  return (
    <div className="relative my-6">
      <div className="w-40 h-40 sm:w-80 sm:h-80 p-4 rounded-3xl overflow-hidden shadow-2xl bg-neutral-800">
        <img
          className="rounded-2xl"
          src={framePath}
        />
      </div>
      <div className="absolute left-2 -bottom-10 sm:left-4 w-36 sm:w-72 p-2 rounded-2xl bg-neutral-800">
        <h1 className="truncate">{id}</h1>
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center justify-start">
                <img className="w-4 sm:w-5" src="https://cryptologos.cc/logos/solana-sol-logo.png?v=025" />
                <span className="text-md sm:text-lg font-medium">{price}</span>
            </div>
            <button className="px-2 text-sm rounded-md bg-gradient-to-r from-blue-500 to-purple-500">BUY</button>
        </div>
      </div>
    </div>
  );
}
