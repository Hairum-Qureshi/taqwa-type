import { bouncy } from 'ldrs'

bouncy.register()

export default function LoadingSpinner() {
  return (
    <div className = "w-full text-center mt-56">
        <h1 className = "text-xl">
            <span className = "mr-4">
            <l-bouncy
                size="45"
                speed="1.75" 
                color="black" 
            ></l-bouncy>
            </span>
            Loading
        </h1>        
  </div>
  )
}
