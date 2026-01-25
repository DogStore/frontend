<template>
  <div>
    <!-- Top Left Decorative Ellipse (Blue) -->
    <div class="absolute -top-70 -left-45 w-[1600px] h-[900px] bg-orange-100 rounded-full opacity-100 transform rotate-170"></div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 py-12">
      <!-- Top Section: Header and Image side by side -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-13 items-center">
        <!-- Left Column: Header Content -->
        <div class="space-y-6 relative pr-4 lg:pr-8">
          <!-- Decorative Small Ellipse behind text -->
          <div class="absolute -left-6 -top-6 w-24 h-24 bg-amber-50 rounded-full opacity-80"></div>

          <h1 class="text-5xl md:text-6xl font-bold text-[#0B0660] leading-tight relative z-10 font-nunito">
            Health and Happiness For your Beloved
          </h1>
          <p class="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Spend quality time with your pet, providing them with affection, attention, and positive reinforcement products.
          </p>
        </div>

        <!-- Right Column: Woman & Dog Image with Ellipse -->
        <div class="relative">
          <!-- Large Ellipse Container -->
          <div class="relative w-full h-[500px]">
            <!-- Outer Orange Ellipse -->
            <div class="absolute inset-0 border-2 border-amber-500 rounded-full opacity-90 shadow-1xl"></div>

            <!-- Middle White Ellipse -->
            <div class="absolute inset-6 bg-orange-400 rounded-full"></div>

            <!-- Inner Ellipse with Image -->
            <div class="absolute inset-12 bg-orange-100 rounded-full shadow-inner overflow-hidden">
              <img src="@/assets/AboutUs/Women&Dog.png"
                   class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                   alt="Woman kissing her dog">
            </div>

            <!-- Decorative Paw Prints -->
            <div class="absolute -top-17 -left-15 w-20 h-20 p-4 rounded-full">
              <img src="@/assets/AboutUs/Pawprint.png" class="w-full h-full" alt="Pawprint">
            </div>
            <div class="absolute -bottom-6 -right-6 w-20 h-20 bg-white rounded-full p-4 shadow-lg">
              <img src="@/assets/AboutUs/Dog_Bone.png" class="w-full h-full" alt="Dog Bone">
            </div>
          </div>
        </div>
      </div>

      <!-- Divider with decorative ellipses -->
      <div class="relative mb-16">
        <!-- Decorative ellipses along the divider -->
        <div class="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-amber-200 rounded-full animate-pulse"></div>
        <div class="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blue-200 rounded-full animate-pulse delay-75"></div>
        <div class="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-red-200 rounded-full animate-pulse delay-150"></div>
        <div class="absolute left-3/4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-amber-200 rounded-full animate-pulse delay-300"></div>
        <div class="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-200 rounded-full animate-pulse delay-500"></div>

        <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      <!-- Main Two Column Layout for Founding Story -->
      <div class="mb-24">
        <section class="px-4 pt-2 md:py-20 bg-white relative overflow-hidden border border-gray-100 rounded-3xl shadow-lg">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Heading - Centered above dogs -->
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-8 md:mb-12 lg:mb-10 font-nunito">
              The founding story
              <br class="hidden sm:block" />
              behind our practice
            </h2>

            <!-- Main two-column content -->
            <div class="pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <!-- LEFT: Dogs with circular frame -->
              <div class="relative flex justify-center lg:justify-start">
                <!-- Large circular background -->
                <div class="pt-20 absolute inset-0 flex items-center justify-center">
                  <div class="w-[380px] h-[380px] md:w-[480px] md:h-[480px] lg:w-[520px] lg:h-[520px] bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-full shadow-2xl"></div>
                </div>

                <!-- Dogs image (centered inside circle) - OUTSIDE the background container -->
                <img
                  src="@/assets/AboutUs/White_Dog.png"
                  class="absolute left-1/3 top-50% w-48 md:w-56 lg:w-64 h-auto object-cover rounded-3xl shadow-2xl z-10 transform -translate-x-[120px] -translate-y-[150px] -rotate-6 hover:rotate-0 transition-transform duration-500"
                  alt="White Dog"
                />
                <img
                  src="@/assets/AboutUs/Dog&Clothes.png"
                  class="absolute left-1/3 top-50% w-56 md:w-64 lg:w-72 h-auto object-cover rounded-3xl shadow-2xl z-20 transform translate-x-[25px] translate-y-5px] rotate-6 hover:rotate-0 transition-transform duration-500"
                  alt="Dog with Clothes"
                />
              </div>
              <!-- RIGHT: Text content -->
              <div class="space-y-8 text-center lg:text-left">
                <p class="text-xl md:text-1xl lg:text-3xl text-gray-700 leading-relaxed font-light">
                  We're not just a store; we're a team of dog experts. Our veterinarians, trainers, and groomers use their firsthand knowledge to select every product, guaranteeing the best for your dog's health and happiness.
                </p>

                <!-- Trust badge at bottom -->
                <div class="mt-12 flex flex-col items-center lg:items-start">
                  <div class="relative bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-6 rounded-2xl shadow-lg border border-amber-200">

                    <!-- Avatars positioned on TOP border (centered) -->
                    <div class="absolute -top-5 left-1/6 transform -translate-x-1/2 flex -space-x-3">
                      <img class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-lg"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                          alt="Happy customer" />
                      <img class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-lg"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                          alt="Happy customer" />
                      <img class="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-lg"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                          alt="Happy customer" />
                    </div>

                    <!-- Plus icon positioned on TOP border (right side) -->
                    <div class="absolute -top-4 left-1/4 w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg border-2 border-white">
                      +
                    </div>

                    <!-- Trust text with top padding for avatar space -->
                    <p class="text-lg md:text-xl text-gray-700 font-medium text-center lg:text-left pt-2 md:pt-4">
                      Trusted by over 3 million customers worldwide in only 1 year since commence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60 -mr-32 -mt-32"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-40 -ml-48 -mb-48"></div>
        </section>
      </div>

      <!-- Divider before Contact Section -->
      <div class="relative my-20">
        <!-- Decorative ellipses -->
        <div class="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full animate-bounce"></div>
        <div class="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full animate-bounce delay-300"></div>
        <div class="absolute left-3/4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-red-200 to-pink-200 rounded-full animate-bounce delay-500"></div>

        <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
      </div>

      <!-- Centered Contact Section -->
      <div class="w-full">
        <!-- Contact Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or want to learn more about our products? We'd love to hear from you!
          </p>
        </div>

        <!-- Centered Contact Info Card -->
        <div class="mb-20 w-full flex justify-center">
          <div class="max-w-md md:max-w-lg w-full space-y-8 relative">
            <!-- Background Ellipses -->
            <div class="absolute -right-10 top-20 w-60 h-60 bg-gradient-to-br from-red-50 to-pink-50 rounded-full opacity-60"></div>
            <div class="absolute -left-10 top-10 w-60 h-60 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full opacity-60"></div>

            <!-- Contact Info Card -->
            <div class="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <!-- Animated ellipses in background -->
              <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
              <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full animate-pulse delay-500"></div>
              <div class="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-700"></div>

              <div class="relative z-10">
                <!-- Header -->
                <div class="text-center mb-6 md:mb-8">
                  <h3 class="text-2xl md:text-3xl font-bold mb-3">
                    Contact Information
                  </h3>
                  <p class="text-base md:text-lg opacity-90">
                    Say something to start a live chat!
                  </p>
                </div>

                <!-- Contact Details -->
                <div class="space-y-6 md:space-y-8">
                  <!-- Phone -->
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold text-lg md:text-xl">+1012 3456 789</p>
                      <p class="text-white/80 text-sm md:text-base">Call us anytime</p>
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p class="font-bold text-lg md:text-xl">demo@gmail.com</p>
                      <p class="text-white/80 text-sm md:text-base">Email us for support</p>
                    </div>
                  </div>

                  <!-- Address -->
                  <div class="pt-4">
                    <p class="font-bold text-lg md:text-xl mb-3">Our Location</p>
                    <p class="text-sm md:text-base opacity-90 mb-4">
                      132 Dartmouth Street<br>
                      Boston, Massachusetts 02156<br>
                      United States
                    </p>
                    <div class="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                      <p class="font-bold text-base md:text-lg mb-2">Office Hours</p>
                      <div class="space-y-1 text-sm md:text-base">
                        <p>Monday - Friday: 9am - 6pm</p>
                        <p>Saturday: 10am - 4pm</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  <!-- Social Media Icons -->
                  <div class="pt-6">
                    <p class="font-bold text-lg md:text-xl mb-4 text-center">Follow Us</p>
                    <div class="flex justify-center space-x-4">
                      <a href="#" class="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition backdrop-blur-sm hover:scale-110 transform transition-transform duration-300">
                        <svg class="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" class="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition backdrop-blur-sm hover:scale-110 transform transition-transform duration-300">
                        <svg class="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                        </svg>
                      </a>
                      <a href="#" class="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition backdrop-blur-sm hover:scale-110 transform transition-transform duration-300">
                        <svg class="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

</script>

<style>
/* Styles remain the same */
input:focus, textarea:focus {
  outline: none;
  box-shadow: 0 2px 0 0 #f59e0b;
  transition: box-shadow 0.3s ease;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Animation for decorative elements */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Gradient text effect */
.gradient-text {
  background: linear-gradient(135deg, #f59e0b, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Custom scrollbar with gradient */
textarea::-webkit-scrollbar {
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #fef3c7, #fed7aa);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #f59e0b, #ea580c);
  border-radius: 4px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #d97706, #c2410c);
}
</style>
