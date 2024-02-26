interface WonScreenProps {
  onPlayAgain: () => void;
}

export const WonScreen = ({ onPlayAgain }: WonScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
      <p className="text-2xl mb-8">
        You've successfully completed the Country Quiz!
      </p>
      <button
        onClick={onPlayAgain}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Play Again
      </button>
    </div>
  );
};
