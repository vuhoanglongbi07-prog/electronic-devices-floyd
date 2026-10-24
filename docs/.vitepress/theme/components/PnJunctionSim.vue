<script setup lang="ts">
import { ref, computed } from 'vue'

const material = ref<'Si' | 'Ge'>('Si')
const vBias = ref<number>(0) // from -5.0V to +0.9V
const tempC = ref<number>(25) // Celsius
const naExp = ref<number>(16) // log10(N_A) in cm^-3
const ndExp = ref<number>(16) // log10(N_D) in cm^-3

// Thermal voltage V_T = k_B * T / q
const vtMv = computed(() => {
  const tK = tempC.value + 273.15
  return (8.617333e-5 * tK * 1000) // in mV
})

// Intrinsic carrier concentration n_i(T) approximation
const niVal = computed(() => {
  const tK = tempC.value + 273.15
  if (material.value === 'Si') {
    return 1.5e10 * Math.pow(tK / 300, 1.5) * Math.exp((1.12 / (2 * 8.617e-5)) * (1 / 300 - 1 / tK))
  } else {
    return 2.4e13 * Math.pow(tK / 300, 1.5) * Math.exp((0.67 / (2 * 8.617e-5)) * (1 / 300 - 1 / tK))
  }
})

// Built-in barrier potential V_B = V_T * ln(N_A * N_D / n_i^2)
const vBarrier = computed(() => {
  const vt = vtMv.value / 1000
  const na = Math.pow(10, naExp.value)
  const nd = Math.pow(10, ndExp.value)
  const ni = niVal.value
  const vb = vt * Math.log((na * nd) / (ni * ni))
  return Math.max(0.1, Number(vb.toFixed(3)))
})

const bandgapEv = computed(() => (material.value === 'Si' ? '1.12 eV' : '0.67 eV'))

// Depletion width calculation in micrometers (µm)
const depletionInfo = computed(() => {
  const eps0 = 8.854e-14 // F/cm
  const epsR = material.value === 'Si' ? 11.7 : 16.0
  const epsS = eps0 * epsR
  const q = 1.602e-19
  const na = Math.pow(10, naExp.value)
  const nd = Math.pow(10, ndExp.value)
  const effV = Math.max(0.02, vBarrier.value - vBias.value)
  const wCm = Math.sqrt(((2 * epsS) / q) * (1 / na + 1 / nd) * effV)
  const wUm = wCm * 1e4
  // Penetration into P (x_p) and N (x_n): x_p / x_n = N_D / N_A
  const xpRatio = nd / (na + nd)
  const xnRatio = na / (na + nd)
  return {
    wUm: wUm.toFixed(3),
    xpUm: (wUm * xpRatio).toFixed(3),
    xnUm: (wUm * xnRatio).toFixed(3),
    xpPct: Math.round(xpRatio * 100),
    xnPct: Math.round(xnRatio * 100)
  }
})

// State classification
const junctionState = computed(() => {
  if (Math.abs(vBias.value) < 0.03) {
    return {
      code: 'EQ',
      label: 'Cân bằng nhiệt động học (Thermal Equilibrium, V_D = 0 V)',
      color: '#6366f1',
      desc: 'Mức năng lượng Fermi E_F phẳng trên toàn tinh thể. Dòng khuếch tán (Diffusion) của hạt đa số triệt tiêu hoàn toàn với dòng trôi (Drift) của hạt thiểu số qua điện trường nội tại E_0. Dòng tổng I_D = 0.'
    }
  }
  if (vBias.value < 0) {
    return {
      code: 'REV',
      label: 'Phân cực ngược (Reverse Bias, V_D < 0)',
      color: '#ef4444',
      desc: `Hàng rào thế tổng cộng tăng lên thành (V_B + V_R) = ${(vBarrier.value - vBias.value).toFixed(2)} V. Điện trường ngoài cùng chiều với điện trường nội tại E_0 làm vùng nghèo giãn rộng ra (${depletionInfo.value.wUm} µm), đặc biệt ăn sâu vào phía pha tạp nhẹ hơn. Dòng khuếch tán bị khóa, chỉ còn dòng rò bão hòa ngược I_S do hạt thiểu số sinh nhiệt.`
    }
  }
  if (vBias.value < vBarrier.value) {
    return {
      code: 'FWD_SUB',
      label: 'Phân cực thuận dưới ngưỡng rào thế (0 < V_D < V_B)',
      color: '#f59e0b',
      desc: `Hàng rào thế hiệu dụng giảm xuống còn (V_B - V_D) = ${(vBarrier.value - vBias.value).toFixed(3)} V. Nồng độ hạt thiểu số tiêm qua biên vùng nghèo tăng theo hàm mũ exp(V_D / V_T), dòng khuếch tán bắt đầu vượt trội dòng trôi.`
    }
  }
  return {
    code: 'FWD_ON',
    label: 'Phân cực thuận dẫn mạnh (Strong Forward Injection, V_D ≥ V_B)',
    color: '#10b981',
    desc: `Điện áp ngoài đã triệt tiêu hàng rào thế nội tại (${vBarrier.value} V). Vùng nghèo thu hẹp tối đa (${depletionInfo.value.wUm} µm), lỗ trống từ P và electron từ N ồ ạt tiêm qua mặt ghép (Minority Carrier Injection) tạo dòng thuận lớn tăng theo hàm mũ Shockley.`
  }
})

// Visual depletion width in %
const depletionWidthPct = computed(() => {
  if (vBias.value >= vBarrier.value) return 8
  if (vBias.value >= 0) {
    const ratio = vBias.value / vBarrier.value
    return Math.round(24 - ratio * 16)
  }
  const revRatio = Math.min(1, Math.abs(vBias.value) / 5)
  return Math.round(24 + revRatio * 38)
})
</script>

<template>
  <div class="sim-card">
    <div class="sim-title-bar">
      <div>
        <h4 style="margin: 0;">🔬 Phòng Thí Nghiệm Vật Lý Bán Dẫn: Giải Tích Chuyển Tiếp P-N & Phương Trình Poisson</h4>
        <span style="font-size: 0.82rem; opacity: 0.85;">
          Thay đổi nồng độ pha tạp <i>N</i><sub>A</sub>, <i>N</i><sub>D</sub>, điện áp phân cực <i>V</i><sub>D</sub> và nhiệt độ <i>T</i> để kiểm chứng sự bất đối xứng của vùng nghèo (<i>N</i><sub>A</sub>·<i>x</i><sub>p</sub> = <i>N</i><sub>D</sub>·<i>x</i><sub>n</sub>)
        </span>
      </div>
      <div class="mat-switch">
        <button :class="{ active: material === 'Si' }" @click="material = 'Si'">Silicon (Si)</button>
        <button :class="{ active: material === 'Ge' }" @click="material = 'Ge'">Germanium (Ge)</button>
      </div>
    </div>

    <div class="controls-row">
      <div class="ctrl-item">
        <label>
          Điện áp phân cực ngoài (<i>V</i><sub>D</sub>):
          <strong>{{ vBias > 0 ? '+' + vBias.toFixed(2) : vBias.toFixed(2) }} V</strong>
        </label>
        <input type="range" min="-5" max="0.9" step="0.05" v-model.number="vBias" />
        <div class="preset-btns">
          <button @click="vBias = -4.0">Phân cực ngược (-4V)</button>
          <button @click="vBias = 0">Cân bằng (0V)</button>
          <button @click="vBias = material === 'Si' ? 0.75 : 0.35">Phân cực thuận (ON)</button>
        </div>
      </div>

      <div class="ctrl-item">
        <label>
          Nhiệt độ tuyệt đối (<i>T</i>):
          <strong>{{ tempC }} °C ({{ (tempC + 273.15).toFixed(0) }} K)</strong> — Điện áp nhiệt <i>V</i><sub>T</sub> = <strong>{{ vtMv.toFixed(2) }} mV</strong>
        </label>
        <input type="range" min="-20" max="125" step="5" v-model.number="tempC" />
        <div class="metrics-mini">
          <span>Vùng cấm <i>E</i><sub>g</sub>: <strong>{{ bandgapEv }}</strong></span>
          <span>Rào thế nội tại <i>V</i><sub>B</sub>: <strong>{{ vBarrier }} V</strong></span>
          <span>Tổng bề rộng <i>W</i>: <strong>{{ depletionInfo.wUm }} µm</strong></span>
        </div>
      </div>

      <div class="ctrl-item">
        <label>
          Nồng độ Acceptor bên P (<i>N</i><sub>A</sub> = 10<sup>{{ naExp }}</sup> cm<sup>−3</sup>) & Donor bên N (<i>N</i><sub>D</sub> = 10<sup>{{ ndExp }}</sup> cm<sup>−3</sup>):
        </label>
        <div style="display:flex; gap:10px; align-items:center;">
          <span style="font-size:0.78rem; white-space:nowrap;"><i>N</i><sub>A</sub>:</span>
          <input type="range" min="14" max="18" step="0.5" v-model.number="naExp" />
          <span style="font-size:0.78rem; white-space:nowrap;"><i>N</i><sub>D</sub>:</span>
          <input type="range" min="14" max="18" step="0.5" v-model.number="ndExp" />
        </div>
        <div class="metrics-mini">
          <span>Độ lấn sang P (<i>x</i><sub>p</sub>): <strong>{{ depletionInfo.xpUm }} µm ({{ depletionInfo.xpPct }}%)</strong></span>
          <span>Độ lấn sang N (<i>x</i><sub>n</sub>): <strong>{{ depletionInfo.xnUm }} µm ({{ depletionInfo.xnPct }}%)</strong></span>
        </div>
      </div>
    </div>

    <!-- Visual P-N Junction Diagram -->
    <div class="pn-visual-wrapper">
      <div class="terminal-label anode">
        Anode (P)<br />
        <small>{{ vBias > 0 ? '⊕ Cực (+)' : vBias < 0 ? '⊖ Cực (-)' : 'Hở mạch' }}</small>
      </div>

      <div class="pn-block">
        <!-- P Region -->
        <div class="p-side" :style="{ width: (50 - depletionWidthPct / 2) + '%' }">
          <div class="region-title">Miền P (10<sup>{{ naExp }}</sup> cm<sup>−3</sup>)</div>
          <div class="carrier-Sub">Đa số: Lỗ trống (<i>p</i><sub>p0</sub> ≈ <i>N</i><sub>A</sub>)</div>
          <div class="carrier-icons">⊕ ⊕ ⊕ ⊕ ⊕</div>
        </div>

        <!-- Depletion Region -->
        <div class="depletion-zone" :style="{ width: depletionWidthPct + '%' }">
          <div class="dep-label">Vùng nghèo W = {{ depletionInfo.wUm }} µm</div>
          <div class="ions-split">
            <div class="neg-ions" title="Ion Acceptor âm cố định N_A⁻ bên P">
              − − ({{ depletionInfo.xpPct }}%)
            </div>
            <div class="junction-line"></div>
            <div class="pos-ions" title="Ion Donor dương cố định N_D⁺ bên N">
              + + ({{ depletionInfo.xnPct }}%)
            </div>
          </div>
          <div class="efield-arrow" title="Điện trường nội tại E_0 hướng từ N sang P">
            ⟵ Điện trường E ({{ vBarrier }} V)
          </div>
        </div>

        <!-- N Region -->
        <div class="n-side" :style="{ width: (50 - depletionWidthPct / 2) + '%' }">
          <div class="region-title">Miền N (10<sup>{{ ndExp }}</sup> cm<sup>−3</sup>)</div>
          <div class="carrier-Sub">Đa số: Electron (<i>n</i><sub>n0</sub> ≈ <i>N</i><sub>D</sub>)</div>
          <div class="carrier-icons">⊖ ⊖ ⊖ ⊖ ⊖</div>
        </div>
      </div>

      <div class="terminal-label cathode">
        Cathode (N)<br />
        <small>{{ vBias > 0 ? '⊖ Cực (-)' : vBias < 0 ? '⊕ Cực (+)' : 'Hở mạch' }}</small>
      </div>
    </div>

    <div class="state-banner" :style="{ borderLeftColor: junctionState.color }">
      <strong :style="{ color: junctionState.color }">Trạng thái vật lý: {{ junctionState.label }}</strong>
      <p style="margin: 4px 0 0 0; font-size: 0.88rem;">{{ junctionState.desc }}</p>
    </div>
  </div>
</template>

<style scoped>
.sim-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.mat-switch {
  display: flex;
  gap: 6px;
}
.mat-switch button {
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  font-size: 0.82rem;
  cursor: pointer;
  font-weight: 600;
}
.mat-switch button.active {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}
.controls-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.ctrl-item {
  background: var(--vp-c-bg-soft);
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
.ctrl-item label {
  display: block;
  font-size: 0.84rem;
  margin-bottom: 6px;
}
.ctrl-item input[type='range'] {
  width: 100%;
}
.preset-btns {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.preset-btns button {
  font-size: 0.75rem;
  padding: 3px 8px;
  border-radius: 5px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  cursor: pointer;
}
.preset-btns button:hover {
  border-color: var(--vp-c-brand-1);
}
.metrics-mini {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 0.78rem;
  margin-top: 8px;
}
.pn-visual-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0;
}
.terminal-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
  min-width: 75px;
  padding: 8px 4px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}
.pn-block {
  flex: 1;
  display: flex;
  height: 125px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid var(--vp-c-divider);
}
.p-side {
  background: rgba(239, 68, 68, 0.14);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  transition: width 0.25s ease;
  overflow: hidden;
}
.n-side {
  background: rgba(59, 130, 246, 0.14);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  transition: width 0.25s ease;
  overflow: hidden;
}
.depletion-zone {
  background: repeating-linear-gradient(
    45deg,
    rgba(245, 158, 11, 0.18),
    rgba(245, 158, 11, 0.18) 8px,
    rgba(245, 158, 11, 0.06) 8px,
    rgba(245, 158, 11, 0.06) 16px
  );
  border-left: 2px dashed #f59e0b;
  border-right: 2px dashed #f59e0b;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 6px 2px;
  transition: width 0.25s ease;
  overflow: hidden;
}
.region-title {
  font-weight: 700;
  font-size: 0.8rem;
  white-space: nowrap;
}
.carrier-Sub {
  font-size: 0.72rem;
  opacity: 0.85;
  white-space: nowrap;
}
.carrier-icons {
  font-size: 0.9rem;
  font-weight: 700;
  margin-top: 4px;
  letter-spacing: 2px;
  white-space: nowrap;
}
.dep-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #d97706;
  white-space: nowrap;
}
.ions-split {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  font-weight: 800;
  font-size: 0.75rem;
  line-height: 1.1;
}
.neg-ions {
  color: #ef4444;
  text-align: right;
}
.pos-ions {
  color: #3b82f6;
  text-align: left;
}
.junction-line {
  width: 2px;
  height: 36px;
  background: var(--vp-c-text-2);
  opacity: 0.5;
}
.efield-arrow {
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}
.state-banner {
  background: var(--vp-c-bg-soft);
  border-left: 4px solid #3b82f6;
  padding: 10px 14px;
  border-radius: 6px;
}
</style>
