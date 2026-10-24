<script setup lang="ts">
import { ref, computed } from 'vue'

type DiodeModelType = 'ideal' | 'practical' | 'complete'

const model = ref<DiodeModelType>('practical')
const vBias = ref<number>(5.0) // V_BIAS in Volts (0.5 to 12V)
const rLimit = ref<number>(330) // R_LIMIT in Ohms (100 to 1000)
const rBulk = ref<number>(10) // r'_d in Ohms for Complete model (1 to 50)

// Saturation current I_F(sat) = V_BIAS / R_LIMIT (in mA)
const iSatMa = computed(() => (vBias.value / rLimit.value) * 1000)

// Operating point (V_F, I_F) based on selected Floyd model
const qPoint = computed(() => {
  if (model.value === 'ideal') {
    const vf = 0
    const ifMa = (vBias.value / rLimit.value) * 1000
    return { vf, ifMa, pdMw: vf * ifMa, rdAc: ifMa > 0 ? 25 / ifMa : 0 }
  }
  if (model.value === 'practical') {
    if (vBias.value <= 0.7) {
      return { vf: vBias.value, ifMa: 0, pdMw: 0, rdAc: 0 }
    }
    const vf = 0.7
    const ifMa = ((vBias.value - 0.7) / rLimit.value) * 1000
    return { vf, ifMa, pdMw: vf * ifMa, rdAc: 25 / ifMa }
  }
  // complete model: V_F = 0.7V + I_F * r'_d
  if (vBias.value <= 0.7) {
    return { vf: vBias.value, ifMa: 0, pdMw: 0, rdAc: 0 }
  }
  const ifA = (vBias.value - 0.7) / (rLimit.value + rBulk.value)
  const ifMa = ifA * 1000
  const vf = 0.7 + ifA * rBulk.value
  return { vf, ifMa, pdMw: vf * ifMa, rdAc: 25 / ifMa }
})

// Voltage across resistor V_R = I_F * R_LIMIT
const vResistor = computed(() => (qPoint.value.ifMa / 1000) * rLimit.value)

const zoomKnee = ref<boolean>(false)
const xMaxV = computed(() => (zoomKnee.value ? 2.0 : Math.max(2.0, vBias.value * 1.05)))
const yMaxMa = computed(() => Math.max(10, iSatMa.value * 1.15))

function toSvgX(v: number) {
  const padL = 48
  const width = 420
  return padL + Math.min(1, Math.max(0, v / xMaxV.value)) * width
}

function toSvgY(iMa: number) {
  const padT = 20
  const height = 200
  return padT + height - Math.min(1, Math.max(0, iMa / yMaxMa.value)) * height
}
</script>

<template>
  <div class="sim-card">
    <div class="sim-header">
      <div>
        <h4 style="margin: 0;">📈 Mô Phỏng Chương 2: Ba Mô Hình Tuyến Tính Hóa Từng Đoạn (Piecewise-Linear) & Đường Tải DC</h4>
        <span style="font-size: 0.82rem; opacity: 0.85;">
          So sánh 3 mô hình trong Mục 2-3 sách Floyd: Ideal (Lý tưởng), Practical (Thực tế 0.7 V), và Complete (Đầy đủ có <i>r'</i><sub>d</sub>)
        </span>
      </div>
      <div class="model-tabs">
        <button :class="{ active: model === 'ideal' }" @click="model = 'ideal'">1. Ideal (<i>V</i><sub>F</sub> = 0 V)</button>
        <button :class="{ active: model === 'practical' }" @click="model = 'practical'">2. Practical (<i>V</i><sub>F</sub> = 0.7 V)</button>
        <button :class="{ active: model === 'complete' }" @click="model = 'complete'">3. Complete (0.7 V + <i>I</i><sub>F</sub>·<i>r'</i><sub>d</sub>)</button>
      </div>
    </div>

    <div class="sim-body">
      <div class="sliders-col">
        <div class="s-group">
          <label>Nguồn phân cực <i>V</i><sub>BIAS</sub>: <strong>{{ vBias.toFixed(1) }} V</strong></label>
          <input type="range" min="0.5" max="12" step="0.1" v-model.number="vBias" />
        </div>
        <div class="s-group">
          <label>Điện trở hạn dòng <i>R</i><sub>LIMIT</sub>: <strong>{{ rLimit }} Ω</strong></label>
          <input type="range" min="100" max="1000" step="10" v-model.number="rLimit" />
        </div>
        <div class="s-group" v-if="model === 'complete'">
          <label>Điện trở tổng trở thuận <i>r'</i><sub>d</sub> + <i>r</i><sub>B</sub>: <strong>{{ rBulk }} Ω</strong></label>
          <input type="range" min="2" max="50" step="1" v-model.number="rBulk" />
        </div>

        <div class="results-box">
          <div class="res-item">
            <span>Điểm làm việc tĩnh <i>Q</i>(<i>V</i><sub>F</sub>, <i>I</i><sub>F</sub>):</span>
            <strong>{{ qPoint.vf.toFixed(3) }} V , {{ qPoint.ifMa.toFixed(2) }} mA</strong>
          </div>
          <div class="res-item">
            <span>Điện áp rơi trên <i>R</i><sub>LIMIT</sub>:</span>
            <strong>{{ vResistor.toFixed(2) }} V</strong>
          </div>
          <div class="res-item">
            <span>Công suất tiêu tán <i>P</i><sub>D</sub> = <i>V</i><sub>F</sub>·<i>I</i><sub>F</sub>:</span>
            <strong>{{ qPoint.pdMw.toFixed(2) }} mW</strong>
          </div>
          <div class="res-item">
            <span>Điện trở vi phân <i>r'</i><sub>d</sub> = 25 mV / <i>I</i><sub>F</sub>:</span>
            <strong>{{ qPoint.rdAc > 0 ? qPoint.rdAc.toFixed(2) + ' Ω' : '∞' }}</strong>
          </div>
          <div class="res-item">
            <span>Tung độ cắt đường tải (<i>I</i><sub>F(sat)</sub> = <i>V</i><sub>BIAS</sub> / <i>R</i><sub>LIMIT</sub>):</span>
            <strong>{{ iSatMa.toFixed(2) }} mA</strong>
          </div>
        </div>

        <label class="zoom-toggle">
          <input type="checkbox" v-model="zoomKnee" />
          <span>🔍 Phóng to vùng gối 0 V → 2 V (Quan sát rõ độ dốc 1 / <i>r'</i><sub>d</sub>)</span>
        </label>
      </div>

      <div class="chart-col">
        <svg viewBox="0 0 500 255" class="iv-svg">
          <line x1="48" y1="20" x2="48" y2="220" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
          <line x1="48" y1="220" x2="468" y2="220" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
          <text x="12" y="28" font-size="11" fill="currentColor" opacity="0.8">I_F (mA)</text>
          <text x="415" y="242" font-size="11" fill="currentColor" opacity="0.8">V_F (V)</text>
          <text x="10" y="223" font-size="10" fill="currentColor" opacity="0.7">0</text>
          <text x="8" :y="toSvgY(iSatMa) + 4" font-size="10" fill="#3b82f6" font-weight="bold">{{ iSatMa.toFixed(1) }}</text>
          <text :x="toSvgX(0.7) - 10" y="236" font-size="10" fill="#10b981" font-weight="bold">0.7V</text>

          <!-- DC Load Line -->
          <line
            :x1="toSvgX(0)"
            :y1="toSvgY(iSatMa)"
            :x2="toSvgX(vBias)"
            :y2="toSvgY(0)"
            stroke="#3b82f6"
            stroke-width="2.5"
            stroke-dasharray="5,4"
          />

          <!-- Diode Characteristic Curve -->
          <polyline
            v-if="model === 'ideal'"
            :points="`${toSvgX(0)},${toSvgY(0)} ${toSvgX(0)},${toSvgY(yMaxMa)}`"
            fill="none"
            stroke="#10b981"
            stroke-width="3.5"
          />
          <polyline
            v-else-if="model === 'practical'"
            :points="`${toSvgX(0)},${toSvgY(0)} ${toSvgX(0.7)},${toSvgY(0)} ${toSvgX(0.7)},${toSvgY(yMaxMa)}`"
            fill="none"
            stroke="#10b981"
            stroke-width="3"
          />
          <polyline
            v-else
            :points="`${toSvgX(0)},${toSvgY(0)} ${toSvgX(0.7)},${toSvgY(0)} ${toSvgX(0.7 + (yMaxMa / 1000) * rBulk)},${toSvgY(yMaxMa)}`"
            fill="none"
            stroke="#10b981"
            stroke-width="3"
          />

          <!-- Q-Point Marker -->
          <circle
            :cx="toSvgX(qPoint.vf)"
            :cy="toSvgY(qPoint.ifMa)"
            r="6"
            fill="#ef4444"
            stroke="#ffffff"
            stroke-width="2"
          />
          <text
            :x="toSvgX(qPoint.vf) + 10"
            :y="Math.max(32, toSvgY(qPoint.ifMa) - 6)"
            font-size="11"
            font-weight="bold"
            fill="#ef4444"
          >
            Q ({{ qPoint.vf.toFixed(2) }}V, {{ qPoint.ifMa.toFixed(1) }}mA)
          </text>
        </svg>
        <div class="legend-bar">
          <span><b style="color:#10b981">━━</b> Đặc tuyến Diode ({{ model.toUpperCase() }})</span>
          <span><b style="color:#3b82f6">┅┅</b> Đường tải tĩnh DC (Load Line)</span>
          <span><b style="color:#ef4444">●</b> Điểm làm việc Q-Point</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sim-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.model-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.model-tabs button {
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}
.model-tabs button.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}
.sim-body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  align-items: center;
}
.s-group {
  margin-bottom: 10px;
}
.s-group label {
  display: block;
  font-size: 0.84rem;
  margin-bottom: 4px;
}
.s-group input[type='range'] {
  width: 100%;
}
.results-box {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 10px 12px;
  margin-top: 10px;
}
.res-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  padding: 3px 0;
}
.zoom-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  margin-top: 8px;
  cursor: pointer;
}
.chart-col {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px;
}
.iv-svg {
  width: 100%;
  height: auto;
  display: block;
}
.legend-bar {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  font-size: 0.76rem;
  margin-top: 6px;
}
</style>
