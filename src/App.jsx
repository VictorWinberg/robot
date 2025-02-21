import { useEffect, useState } from 'react';

import { executeCommands, validateCommands } from './utils/robot-utils';
import Grid from './components/RoomGrid';
import { useToast } from './hooks/toast-hook';

const App = () => {
  const toast = useToast();

  const [room, setRoom] = useState({ shape: 'square', size: 5 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0, direction: 'N' });
  const [language, setLanguage] = useState('english');
  const [commands, setCommands] = useState('');

  const [endPos, setEndPos] = useState({});
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (!validateCommands(commands, language)) {
      toast({
        title: 'Invalid Commands',
        description: 'Please check your command syntax and try again.',
      });
      return;
    }

    const { end, path } = executeCommands(commands, language, startPos, room);

    setPath(path);
    setEndPos(end);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commands, language, startPos, room]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-primary">
            Robot<span className='text-secondary'>Me</span>To
            </h1>
          <p className="mt-2 text-sm text-gray-600">
            Control your robot with simple commands
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Room Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Shape
                  </label>
                  <select
                    value={room.shape}
                    onChange={(e) =>
                      setRoom({ ...room, shape: e.target.value })
                    }
                    className="input"
                  >
                    <option value="square">Square</option>
                    <option value="circular">Circular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {room.shape === 'square' ? 'Room Size' : 'Room Radius'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={room.size}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        size: Math.max(1, parseInt(e.target.value) || 1),
                      })
                    }
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start X
                    </label>
                    <input
                      type="number"
                      value={startPos.x}
                      onChange={(e) =>
                        setStartPos({
                          ...startPos,
                          x: parseInt(e.target.value) || 0,
                        })
                      }
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Y
                    </label>
                    <input
                      type="number"
                      value={startPos.y}
                      onChange={(e) =>
                        setStartPos({
                          ...startPos,
                          y: parseInt(e.target.value) || 0,
                        })
                      }
                      className="input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Command Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="input"
                  >
                    <option value="english">English (L, R, F)</option>
                    <option value="swedish">Swedish (V, H, G)</option>
                    <option value="french">French (G, D, A)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commands
                  </label>
                  <input
                    type="text"
                    value={commands}
                    onChange={(e) => setCommands(e.target.value.toUpperCase())}
                    placeholder="Enter commands..."
                    className="input"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            <div className="block bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Final Position
              </h2>
              <div className="text-2xl font-semibold text-secondary">
                {`${endPos.x} ${endPos.y} ${endPos.direction}`}
              </div>
            </div>

            <div className="block bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Room Visualization
              </h2>
              <div className="aspect-square">
                <Grid room={room} start={startPos} end={endPos} path={path} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
