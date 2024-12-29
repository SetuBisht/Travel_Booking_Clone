var path = document.querySelector("#svgPath");

var pathLength = path.getTotalLength();

path.style.strokeDasharray = pathLength + " " + pathLength;

path.style.strokeDashoffset = pathLength;

path.getBoundingClientRect();

window.addEventListener("scroll", function (e) {
  var scrollPercentage =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);

  var drawLength = pathLength * scrollPercentage * 0.9;

  path.style.strokeDashoffset = pathLength - drawLength;
  console.log(scrollPercentage, "scrollPercentage");
  if (scrollPercentage >= 0.7) {
    path.style.strokeDasharray = pathLength + " " + pathLength;
  } else {
    path.style.strokeDasharray = pathLength + " " + pathLength;
  }
});

gsap.registerPlugin(ScrollTrigger);

// Animate the image zoom on scroll
gsap.to(".intro-image", {
  scale: 1.5,
  scrollTrigger: {
    trigger: ".section-start",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

function isMobile() {
  return window.innerWidth <= 768; // Adjust 768px as per your needs for mobile devices
}

// Add event listener for resizing to handle screen changes dynamically
window.addEventListener("resize", function () {
  // Re-initialize the parallax effect if it's on desktop
  if (!isMobile()) {
    enableParallax();
  }
});

// Enable parallax animations
function enableParallax() {
  document.querySelectorAll(".parallax-up").forEach((element) => {
    gsap.to(element, {
      y: -190,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  document.querySelectorAll(".parallax-down").forEach((element) => {
    gsap.to(element, {
      y: 190,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

// Initialize the parallax only for desktop on page load
if (!isMobile()) {
  enableParallax();
}
gsap.to("body", {
  scrollTrigger: {
    trigger: ".section-night", // The element to trigger the animation
    start: "top center", // Start the animation when the top of the content reaches the center of the viewport
    end: "bottom center", // End when the bottom of the content reaches the center of the viewport
    scrub: true, // Enable smooth scrubbing for continuous effect
  },
  backgroundColor: "rgb(2, 22, 27)", // Final background color when scrolling
  color: "rgb(249, 247, 232)", // Final font color when scrolling
  duration: 0.2, // Duration of the animation (can adjust as needed)
});

gsap.to("#svgPath", {
  scrollTrigger: {
    trigger: ".section-night",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
  stroke: "#ffffff", // Change SVG stroke color
  opacity: 0.3, // Change SVG opacity
  duration: 0.2,
});
