const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-5rem)]">
      <img src="/REracle.svg" alt="REracle logo" width={80} height={80} />
      <div className="flex space-x-2 mt-2">
        <span className="block w-3 h-3 bg-gray-400 rounded-full animate-dotPulse" />
        <span className="block w-3 h-3 bg-gray-400 rounded-full animate-dotPulse delay-200" />
        <span className="block w-3 h-3 bg-gray-400 rounded-full animate-dotPulse delay-400" />
      </div>
    </div>
  );
};

export default Loading;
