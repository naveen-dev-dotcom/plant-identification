import TitleHeader from './components/TitleHeader'
import ImageUpload from './components/ImageUpload'
import PlantDetails from './components/PlantDetails'
import ThreeDView from './components/ThreeDView'
import ChatBot from './components/ChatBot'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-300">
      {/* Left - 3D View */}
      <div className="w-1/4 bg-gray-800 overflow-y-auto p-4">
        <ThreeDView />
      </div>

      {/* Center - Main */}
      <div className="w-2/4 bg-gray-900 overflow-y-auto p-4">
        <TitleHeader />
        <ImageUpload />
        <PlantDetails />
        <Footer />
      </div>

      {/* Right - ChatBot */}
      <div className="w-1/4 bg-gray-800 overflow-y-auto p-4">
        <ChatBot />
      </div>
    </div>
  )
}

export default App
