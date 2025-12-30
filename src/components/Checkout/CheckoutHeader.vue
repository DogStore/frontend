<template>
    <div class="bg-[#FFAA0C]/50 text-center py-8 relative">
    <h1 class="text-[60px] font-bold">Checkout</h1>
    
      <RouterLink 
        to="/cart" 
        class="text-[#FF6600]  hover:underline transition"
      >
        Carts
      </RouterLink>
      <span class="mx-1 text-[#FF6600] ">/</span>
      <RouterLink 
        to="/Checkout" 
        class="text-gray-600 hover:underline transition"
      >
        Checkout
      </RouterLink>
   
    <div class="absolute top-6 left-15 flex gap-2">
      <img src="/src/assets/CartImages/image46.png" alt="pets" class="h-[160px]" />
    </div>
    <div class="absolute top-7 right-35">
      <img src="/src/assets/CartImages/image47.png" alt="dog" class="h-[150px]" />
    </div>
  </div>
</template>