import Navbar from "./components/mainNavBarTW";

export default function about() {
    return (
        <div>
    <Navbar />
    {/* <div className="flex-col  justify-center space-y-6 items-center ml-96"> */}
    {/* <div className="flex items-center justify-center h-screen"> */}
    <div>
    <div className="flex items-center justify-center pb-4">
    <div className="w-52 rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/jose.png" alt="Jose Alvarado" width="200" height="200"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Jose Alvarado</div>
        <p class="text-gray-700 text-base">
          Sponsor
        </p>
      </div>
    </div>
    </div>

    <div className="flex items-center justify-center pb-4">
    <div className="px-8">
    <div class="w-52 rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/mark.jpg" alt="Mark Codd" width="200" height="200"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Mark Codd</div>
        <p class="text-gray-700 text-base">
          Backend
        </p>
      </div>
    </div>
    </div>
    {/* </div> */}

    {/* <div className="flex items-center justify-center"> */}
    <div>
    <div class="w-52 rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/bharath.jpg" alt="Bharath Gajjala" width="200" height="200"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Bharath Gajjala</div>
        <p class="text-gray-700 text-base">
          Backend
        </p>
      </div>
      </div>
    </div>
    </div>

    <div className="flex items-center justify-center pb-4">
       <div className="px-8">
    <div class="w-52 rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/theodora.jpg" alt="Theodora Nguyen" width="200" height="200"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Theodora Nguyen</div>
        <p class="text-gray-700 text-base">
          Frontend
        </p>
      </div>
    </div>
    </div> 
    {/* </div> */}

    {/* <div className="flex items-center justify-center"> */}
    <div>
    <div class="w-52 rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/andrew.jpg" alt="Andrew Dao" width="200" height="200"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Andrew Dao</div>
        <p class="text-gray-700 text-base">
         Frontend
        </p>
      </div>
    </div>
    </div>
    </div>
    
    <div className="flex items-center justify-center">
    <div class="w-52 rounded overflow-hidden shadow-lg">
      <img class="w-full" src="/michelle.jpeg" alt="Michelle Feinberg" width="200" height="200"/>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">Michelle Feinberg</div>
        <p class="text-gray-700 text-base">
          Product Manager
        </p>
      </div>
    </div>
    </div>
    </div>

    </div>
    );
}