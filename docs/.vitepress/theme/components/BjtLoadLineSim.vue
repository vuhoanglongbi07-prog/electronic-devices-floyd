<script setup lang="ts">
import { ref, computed } from 'vue'

const vbb = ref<number>(2.5) // Base supply V_BB (0V to 5V)
const rbKohm = ref<number>(47) // Base resistor R_B in kOhm (10 to 220 kOhm)
const vcc = ref<number>(12) // Collector supply V_CC (5V to 24V)
const rcOhm = ref<number>(1000) // Collector resistor R_C in Ohm (220 to 4700 Ohm)
const betaDc = ref<number>(150) // Beta_DC (50 to 300)

const vbe = 0.7 // Silicon BJT
const vceSat = 0.2 // Typical saturation V_CE(sat)

const ibUa = computed(() => {
  if (vbb.value <= vbe) return 0
  return ((vbb.value - vbe) / (rbKohm.value * 1000)) * 1e6
})

const icSatMa = computed(() => ((vcc.value - vceSat) / rcOhm.value) * 1000)
const icCutoffEndMa = computed(() => (vcc.value / rcOhm.value) * 1000)
const icActiveMa = computed(() => (betaDc.value * ibUa.value) / 1000)
const alphaDc = computed(() => (betaDc.value / (betaDc.value + 1)).toFixed(4))

const operatingState = computed(() => {
  if (ibUa.value <= 0.01) {
    return {
      mode: 'CUTOFF',
      label: 'Vùng Ngắt (Cut-off Region: Cả J_E và J_C đều phân cực ngược)',
      color: '#6366f1',
      icMa: 0,
      vce: vcc.value,
      desc: 'Vì V_BB ≤ 0.7 V nên tiếp giáp Phát-Gốc (J_E) không được phân cực thuận → không có sự tiêm hạt dẫn từ Emitter vào Base (I_B = 0, I_C ≈ I_CEO ≈ 0). Transistor hoạt động như khóa HỞ (Open Switch), V_CE = V_CC.'
    }
  }
  if (icActiveMa.value >= icSatMa.value) {
    return {
      mode: 'SATURATION',
      label: 'Vùng Bão Hòa (Saturation Region: Cả J_E và J_C đều phân cực thuận)',
      color: '#ef4444',
      icMa: icSatMa.value,
      vce: vceSat,
      desc: `Dòng lý thuyết β_DC·I_B (${icActiveMa.value.toFixed(2)} mA) vượt quá giới hạn vật lý của mạch ngoài I_C(sat) (${icSatMa.value.toFixed(2)} mA). Điện thế V_C tụt xuống thấp hơn V_B làm tiếp giáp Gốc-Góp (J_C) chuyển sang phân cực thuận! Hệ thức I_C = β_DC·I_B không còn nghiệm đúng, V_CE(sat) ≈ 0.2 V.`
    }
  }
  const vce = vcc.value - (icActiveMa.value / 1000) * rcOhm.value
  return {
    mode: 'ACTIVE',
    label: 'Vùng Khuếch Đại Tuyến Tính (Forward-Active: J_E thuận, J_C ngược)',
    color: '#10b981',
    icMa: icActiveMa.value,
    vce,
    desc: `Tiếp giáp J_E phân cực thuận (0.7 V) tiêm hạt dẫn vào miền Base mỏng; tiếp giáp J_C phân cực ngược (V_CB = ${(vce - 0.7).toFixed(2)} V > 0) quét hạt dẫn về Collector. Dòng I_C = β_DC·I_B tỉ lệ tuyến tính với dòng điều khiển I_B.`
  }
})

function toSvgX(v: number) {
  const padL = 50
  const width = 410
  return padL + Math.min(1, Math.max(0, v / (vcc.value * 1.08))) * width
}

function toSvgY(iMa: number) {
  const padT = 20
  const height = 195
  const maxY = Math.max(5, icCutoffEndMa.value * 1.15)
  return padT + height - Math.min(1, Math.max(0, iMa / maxY)) * height
}
</script>

<template>
  <div class="sim-card">
    <div class="sim-header">
      <div>
        <h4 style="margin: 0;">🎛️ Mô Phỏng Chương 4 & 5: Giải Tích Đường Tải Tĩnh DC & Ba Miền Hoạt Động Của BJT</h4>
        <span style="font-size: 0.82rem; opacity: 0.85;">
          Điều chỉnh <i>V</i><sub>BB</sub>, <i>R</i><sub>B</sub>, <i>V</i><sub>CC</sub>, <i>R</i><sub>C</sub>, <i>β</i><sub>DC</sub> để khảo sát sự chuyển dịch điểm <i>Q</i>(<i>V</i><sub>CEQ</sub>, <i>I</i><sub>CQ</sub>)
        </span>
      </div>
      <div class="preset-group">
        <button @click="vbb = 0.3">Miền Ngắt (Cut-off)</button>
        <button @click="vbb = 2.2; rbKohm = 47; rcOhm = 1000; vcc = 12; betaDc = 150">Chính Giữa Đường Tải (Active)</button>
        <button @click="vbb = 4.8; rbKohm = 15">Miền Bão Hòa (Saturation)</button>
      </div>
    </div>

    <div class="sim-grid">
      <div class="ctrl-panel">
        <div class="s-row">
          <label>Nguồn phân cực Base <i>V</i><sub>BB</sub>: <strong>{{ vbb.toFixed(2) }} V</strong></label>
          <input type="range" min="0" max="5" step="0.05" v-model.number="vbb" />
        </div>
        <div class="s-row">
          <label>Điện trở cực Base <i>R</i><sub>B</sub>: <strong>{{ rbKohm }} kΩ</strong></label>
          <input type="range" min="10" max="200" step="1" v-model.number="rbKohm" />
        </div>
        <div class="s-row">
          <label>Nguồn nuôi <i>V</i><sub>CC</sub>: <strong>{{ vcc }} V</strong> | Điện trở gánh <i>R</i><sub>C</sub>: <strong>{{ rcOhm }} Ω</strong></label>
          <div style="display:flex; gap:8px;">
            <input type="range" min="5" max="24" step="1" v-model.number="vcc" />
            <input type="range" min="330" max="3300" step="10" v-model.number="rcOhm" />
          </div>
        </div>
        <div class="s-row">
          <label>Hệ số khuếch đại dòng <i>β</i><sub>DC</sub>: <strong>{{ betaDc }}</strong> (<i>α</i><sub>DC</sub> = <strong>{{ alphaDc }}</strong>)</label>
          <input type="range" min="50" max="300" step="5" v-model.number="betaDc" />
        </div>

        <div class="metrics-box">
          <div>Dòng cực gốc <i>I</i><sub>B</sub>: <strong>{{ ibUa.toFixed(1) }} µA</strong></div>
          <div>Dòng cực góp <i>I</i><sub>CQ</sub>: <strong>{{ operatingState.icMa.toFixed(2) }} mA</strong></div>
          <div>Điện áp <i>V</i><sub>CEQ</sub>: <strong>{{ operatingState.vce.toFixed(2) }} V</strong></div>
          <div>Giới hạn <i>I</i><sub>C(sat)</sub>: <strong>{{ icSatMa.toFixed(2) }} mA</strong></div>
        </div>
      </div>

      <div class="graph-panel">
        <svg viewBox="0 0 490 250" class="bjt-svg">
          <line x1="50" y1="20" x2="50" y2="215" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
          <line x1="50" y1="215" x2="465" y2="215" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
          <text x="10" y="28" font-size="11" fill="currentColor" opacity="0.8">I_C (mA)</text>
          <text x="410" y="238" font-size="11" fill="currentColor" opacity="0.8">V_CE (V)</text>

          <line :x1="toSvgX(0.2)" y1="20" :x2="toSvgX(0.2)" y2="215" stroke="#ef4444" stroke-dasharray="3,3" opacity="0.6" />

          <polyline
            :points="`${toSvgX(0)},${toSvgY(0)} ${toSvgX(0.2)},${toSvgY(icActiveMa)} ${toSvgX(vcc * 1.05)},${toSvgY(icActiveMa)}`"
            fill="none"
            stroke="#10b981"
            stroke-width="2.5"
          />

          <line
            :x1="toSvgX(0)"
            :y1="toSvgY(icCutoffEndMa)"
            :x2="toSvgX(vcc)"
            :y2="toSvgY(0)"
            stroke="#3b82f6"
            stroke-width="2.5"
          />

          <text x="8" :y="toSvgY(icCutoffEndMa) + 4" font-size="10" fill="#3b82f6" font-weight="bold">
            {{ icCutoffEndMa.toFixed(1) }}
          </text>
          <text :x="toSvgX(vcc) - 14" y="230" font-size="10" fill="#3b82f6" font-weight="bold">
            {{ vcc }}V
          </text>

          <circle
            :cx="toSvgX(operatingState.vce)"
            :cy="toSvgY(operatingState.icMa)"
            r="6.5"
            :fill="operatingState.color"
            stroke="#fff"
            stroke-width="2"
          />
          <text
            :x="Math.min(340, toSvgX(operatingState.vce) + 10)"
            :y="Math.max(35, toSvgY(operatingState.icMa) - 8)"
            font-size="11"
            font-weight="bold"
            :fill="operatingState.color"
          >
            Q ({{ operatingState.vce.toFixed(1) }}V, {{ operatingState.icMa.toFixed(2) }}mA)
          </text>
        </svg>
      </div>
    </div>

    <div class="state-alert" :style="{ borderLeftColor: operatingState.color }">
      <strong :style="{ color: operatingState.color }">{{ operatingState.label }}</strong>
      <p style="margin: 4px 0 0 0; font-size: 0.86rem;">{{ operatingState.desc }}</p>
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
.preset-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.preset-group button {
  font-size: 0.76rem;
  padding: 4px 9px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
  font-weight: 600;
}
.preset-group button:hover {
  border-color: var(--vp-c-brand-1);
}
.sim-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  align-items: center;
}
.s-row {
  margin-bottom: 9px;
}
.s-row label {
  display: block;
  font-size: 0.83rem;
  margin-bottom: 3px;
}
.s-row input[type='range'] {
  width: 100%;
}
.metrics-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  background: var(--vp-c-bg-soft);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.8rem;
  margin-top: 8px;
}
.graph-panel {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px;
}
.bjt-svg {
  width: 100%;
  height: auto;
  display: block;
}
.state-alert {
  margin-top: 12px;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid #10b981;
  padding: 10px 14px;
  border-radius: 6px;
}
</style>
