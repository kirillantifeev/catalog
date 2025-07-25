<template>
  <div class="tooltip-wrapper" ref="wrapper">
    <div @click.stop="toggleTooltip" class="tooltip-trigger">
      <slot name="button"></slot>
    </div>
    <div 
      v-if="isVisible"
      ref="tooltipRef"
      class="tooltip"
      :style="tooltipStyle"
      @click.stop
    >
      <div class="tooltip-content" ref="content">
        <slot></slot>
      </div>
      <div 
        class="custom-scrollbar" 
        ref="scrollbar"
        :style="{ height: contentHeight + 'px' }"
      >
        <div 
          class="scroll-thumb" 
          ref="thumb"
          :style="{
            height: thumbHeight + 'px',
            top: thumbPosition + 'px'
          }"
          @mousedown="startDrag"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

const isVisible = ref(false);
const wrapper = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const scrollbar = ref<HTMLElement | null>(null);
const thumb = ref<HTMLElement | null>(null);
const isDragging = ref(false);


const clickPosition = ref({ x: 0, y: 0 });
const windowSize = ref({ width: window.innerWidth, height: window.innerHeight });
const startDragY = ref(0);
const startThumbPosition = ref(0);
const scrollTop = ref(0);


const tooltipHeight = computed(() => {
  return windowSize.value.width < 768 ? 200 : 336;
});

const tooltipStyle = computed(() => {
  if (!isVisible.value) return {};
  
  const tooltipWidth = windowSize.value.width < 768 ? 300 : 421;
  const tooltipHeightValue = tooltipHeight.value;
  
 
  let left = clickPosition.value.x - 30;
  let top = clickPosition.value.y + 20; 
  
  
  if (left + tooltipWidth > windowSize.value.width) {
    left = windowSize.value.width - tooltipWidth - 30;
  }
  
 
  if (top + tooltipHeightValue > windowSize.value.height) {
    
    top = clickPosition.value.y - tooltipHeightValue - 10;
    
    
    if (top < 0) {
      top = windowSize.value.height - tooltipHeightValue - 10;
    }
  }
  
  
  top = Math.max(10, top);
  
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${tooltipWidth}px`,
    height: `${tooltipHeightValue}px`
  };
});

const contentHeight = computed(() => {
  return tooltipHeight.value;
});

const scrollHeight = computed(() => {
  return content.value?.scrollHeight || 0;
});

const thumbHeight = computed(() => {
  if (scrollHeight.value <= contentHeight.value) return 0;
  const ratio = contentHeight.value / scrollHeight.value;
  return Math.max(ratio * contentHeight.value, 20);
});

const thumbPosition = computed(() => {
  if (!content.value || scrollHeight.value <= contentHeight.value) return 0;
  const maxScroll = scrollHeight.value - contentHeight.value;
  return (scrollTop.value / maxScroll) * (contentHeight.value - thumbHeight.value);
});


const toggleTooltip = async (event: MouseEvent) => {
  clickPosition.value = {
    x: event.clientX,
    y: event.clientY
  };
  isVisible.value = !isVisible.value;
  
  if (isVisible.value) {
    await nextTick();
    if (content.value) {
      content.value.scrollTop = 0;
      scrollTop.value = 0;
      updateThumbPosition();
    }
  }
};
const handleClickOutside = (event: MouseEvent) => {
  if (tooltipRef.value && !tooltipRef.value.contains(event.target as Node)) {
    isVisible.value = false;
  }
};

const handleResize = () => {
  windowSize.value = {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

const startDrag = (e: MouseEvent) => {
  e.preventDefault();
  isDragging.value = true;
  startDragY.value = e.clientY;
  startThumbPosition.value = thumbPosition.value;
  
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
  document.body.style.userSelect = 'none';
};

const handleDrag = (e: MouseEvent) => {
  if (!isDragging.value || !content.value) return;
  
  const deltaY = e.clientY - startDragY.value;
  const newPosition = Math.max(
    0, 
    Math.min(
      startThumbPosition.value + deltaY, 
      contentHeight.value - thumbHeight.value
    )
  );
  
  const scrollRatio = newPosition / (contentHeight.value - thumbHeight.value);
  scrollTop.value = scrollRatio * (scrollHeight.value - contentHeight.value);
  content.value.scrollTop = scrollTop.value;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
  document.body.style.userSelect = '';
};




const handleScroll = () => {
  if (content.value && !isDragging.value) {
    scrollTop.value = content.value.scrollTop;
    
    requestAnimationFrame(() => {
      if (content.value) {
        scrollTop.value = content.value.scrollTop;
      }
    });
  }
};

const updateThumbPosition = () => {
  if (content.value) {
    scrollTop.value = content.value.scrollTop;
    
    const position = thumbPosition.value;
  }
};



const handleWheel = (e: WheelEvent) => {
  if (content.value && !isDragging.value) {
    
    const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    content.value.scrollTop += delta;
    e.preventDefault();
    
    
    requestAnimationFrame(() => {
      if (content.value) {
        scrollTop.value = content.value.scrollTop;
      }
    });
  }
};


const handleGesture = (e: Event) => {
  e.preventDefault();
};

const handleTouchMove = (e: TouchEvent) => {
  if (content.value && !isDragging.value) {
    requestAnimationFrame(() => {
      scrollTop.value = content.value!.scrollTop;
    });
  }
};



onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);

  nextTick(() => {
    if (content.value) {
      content.value.addEventListener('scroll', handleScroll, { passive: true });
      content.value.addEventListener('wheel', handleWheel, { passive: false });
      content.value.addEventListener('touchmove', handleTouchMove, { passive: true });
    }
  });
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
  
  if (content.value) {
    content.value.removeEventListener('scroll', handleScroll);
    content.value.removeEventListener('wheel', handleWheel);
    content.value.removeEventListener('gesturestart', handleGesture);
    content.value.removeEventListener('gesturechange', handleGesture);
    content.value.removeEventListener('gestureend', handleGesture);
    content.value.removeEventListener('touchmove', handleTouchMove);
  }
});

</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
}

.tooltip-trigger {
  cursor: pointer;
}

.tooltip {
  position: absolute;
  width: 421px;
  background: white;
  border: 1px solid #E3E3E3;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  scroll-behavior: smooth;
}

.tooltip-content {
  height: 100%;
  padding: 16px;
  overflow-y: scroll;
  scrollbar-width: none;
  box-sizing: border-box;
    -webkit-overflow-scrolling: touch; 
  overscroll-behavior: contain;
}

.tooltip-content::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar {
  position: absolute;
  top: 0;
  right: 6px;
  width: 6px;
  height: 100%;
  background: white;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 10;
  pointer-events: none;
}

.tooltip:hover .custom-scrollbar {
  opacity: 1;
}

.scroll-thumb {
  position: absolute;
  width: 100%;
  background: #E3E3E3;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s;
  left: 0;
  pointer-events: auto; 
  touch-action: none; 
  will-change: transform;
  transform: translateZ(0);
  
}

.scroll-thumb:hover {
  background: #a8a8a8;
}

@media (max-width: 768px) {
  .tooltip {
    width: 300px;
    
  }

  .container-tooltip {
    padding: 10px;
  }
}
</style>