/* ===== HERCULES FITNESS APP ===== */
const App = (() => {
  // ── State ──────────────────────────────────────────────────────────────────
  let state = {
    view: 'home',
    plans: [],
    profile: {},
    history: [],
    theme: 'light',
    videoReady: new Map(),
    // navigation context
    viewingPlanId: null,
    editingPlan: null,
    exFilterCat: 'all',
    // workout session
    workout: null,
    restTimerId: null,
  };

  // ── Theme ──────────────────────────────────────────────────────────────────
  function loadTheme() {
    return localStorage.getItem('hercules-theme') || 'light';
  }

  function applyTheme(theme) {
    state.theme = theme;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function toggleTheme() {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('hercules-theme', next);
    applyTheme(next);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = next === 'dark' ? iconSun() : iconMoon();
  }

  // ── Video preloading ───────────────────────────────────────────────────────
  function preloadVideos() {
    EXERCISES.forEach(ex => {
      if (!ex.video) return;
      state.videoReady.set(ex.video, false);
      const vid = document.createElement('video');
      vid.muted = true;
      vid.preload = 'auto';
      vid.src = ex.video;
      vid.addEventListener('canplaythrough', () => state.videoReady.set(ex.video, true), { once: true });
      vid.load();
    });
  }

  // ── Init ───────────────────────────────────────────────────────────────────
  function init() {
    state.plans   = loadPlans();
    state.profile = loadProfile();
    state.history = loadHistory();
    applyTheme(loadTheme());
    registerSW();
    render();
    preloadVideos();
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        preloader.addEventListener('animationend', () => preloader.remove(), { once: true });
      }, 1500);
    }
    window.addEventListener('popstate', () => navigate('home'));
  }

  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  // ── Navigation ─────────────────────────────────────────────────────────────
  function navigate(view, data = {}) {
    Object.assign(state, data);
    state.view = view;
    render();
    const el = document.getElementById('view');
    if (el) { el.classList.remove('view-enter'); void el.offsetWidth; el.classList.add('view-enter'); }
    window.scrollTo(0, 0);
  }

  // ── Master render ──────────────────────────────────────────────────────────
  function render() {
    const nav = document.getElementById('bottom-nav');
    const view = document.getElementById('view');
    const isWorkout = state.view === 'workout';
    if (nav) nav.className = 'bottom-nav' + (isWorkout ? ' hidden' : '');
    if (nav && !isWorkout) renderNav(nav);
    if (view) {
      view.className = 'view' + (isWorkout ? ' fullscreen' : '');
      switch (state.view) {
        case 'home':             view.innerHTML = tmplHome(); break;
        case 'plans':            view.innerHTML = tmplPlans(); break;
        case 'plan-detail':      view.innerHTML = tmplPlanDetail(); break;
        case 'plan-editor':      view.innerHTML = tmplPlanEditor(); break;
        case 'exercise-selector':view.innerHTML = tmplExerciseSelector(); break;
        case 'workout':          view.innerHTML = tmplWorkout(); startWorkoutListeners(); break;
        case 'workout-complete': view.innerHTML = tmplWorkoutComplete(); break;
        case 'profile':          view.innerHTML = tmplProfile(); break;
      }
    }
    attachGlobalListeners();
  }

  function renderNav(nav) {
    const tabs = [
      { id: 'home',    icon: iconHome(),   label: 'Home'    },
      { id: 'plans',   icon: iconPlans(),  label: 'Plans'   },
      { id: 'profile', icon: iconProfile(),label: 'Profile' },
    ];
    nav.innerHTML = tabs.map(t => `
      <button class="nav-item ${state.view === t.id || (state.view.startsWith('plan') && t.id === 'plans') ? 'active' : ''}"
              onclick="App.go('${t.id}')">
        ${t.icon}
        <span>${t.label}</span>
        <span class="nav-dot"></span>
      </button>
    `).join('');
  }

  // ── HOME VIEW ──────────────────────────────────────────────────────────────
  function tmplHome() {
    const lvl = getLevelInfo(state.profile.totalXp || 0);
    const todayPlan = getTodayPlan(state.plans);
    const streak = state.profile.streak || 0;
    const totalW = state.profile.totalWorkouts || 0;
    const totalR = state.profile.totalReps || 0;

    const recentBadges = BADGES.filter(b => state.profile.badges?.includes(b.id)).slice(-5);
    const lockedBadges = BADGES.filter(b => !state.profile.badges?.includes(b.id)).slice(0, 3);
    const shownBadges  = [...recentBadges, ...lockedBadges].slice(0, 6);

    return `
      <div class="home-header">
        <div class="flex items-center justify-between">
          <div>
            <div class="home-logo">HERCULES</div>
            <div class="home-tagline">Young Champion Fitness</div>
          </div>
          <button class="theme-toggle" id="theme-toggle-btn" onclick="App.toggleTheme()">
            ${state.theme === 'dark' ? iconSun() : iconMoon()}
          </button>
        </div>
        <div class="level-badge">
          <span class="level-num">LVL ${lvl.level}</span>
          <span class="level-name">${lvl.name}</span>
        </div>
        <div class="xp-bar-wrap">
          <div class="xp-bar-label">
            <span>${lvl.xpInLevel} XP</span>
            <span>${lvl.xpForLevel} XP</span>
          </div>
          <div class="xp-bar-track">
            <div class="xp-bar-fill" style="width:${lvl.pct}%"></div>
          </div>
        </div>
      </div>

      ${streak > 0 ? `
      <div class="streak-banner" style="margin-top:16px">
        <span class="fire">🔥</span>
        <div>
          <div class="streak-text">${streak}-Day Streak!</div>
          <div class="streak-days">Keep it up, champion!</div>
        </div>
      </div>` : ''}

      <div class="stats-row" style="margin-top:${streak > 0 ? 12 : -16}px">
        <div class="stat-chip">
          <div class="stat-val">${totalW}</div>
          <div class="stat-label">WORKOUTS</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val">${formatNum(totalR)}</div>
          <div class="stat-label">TOTAL REPS</div>
        </div>
        <div class="stat-chip">
          <div class="stat-val">${streak}</div>
          <div class="stat-label">STREAK</div>
        </div>
      </div>

      <div class="section" style="margin-top:8px">
        <div class="section-title">Today's Workout</div>
        ${todayPlan ? `
          <div class="today-card" onclick="App.startWorkout('${todayPlan.id}')">
            <div class="plan-name">${esc(todayPlan.name)}</div>
            <div class="plan-meta">
              ${todayPlan.exercises.length} exercise${todayPlan.exercises.length !== 1 ? 's' : ''} •
              ${estimateDuration(todayPlan)} min estimated
            </div>
            <button class="start-btn">▶ START WORKOUT</button>
          </div>
        ` : `
          <div class="rest-day-card">
            <div class="emoji">😴</div>
            <p>Rest day — no plan scheduled today.</p>
            <p style="margin-top:8px"><a onclick="App.go('plans')" style="color:var(--primary);cursor:pointer;font-weight:700;letter-spacing:1px;font-family:'Barlow Condensed',sans-serif;font-size:14px;text-transform:uppercase;">View Plans →</a></p>
          </div>
        `}
      </div>

      ${state.plans.length > 0 ? `
      <div class="section">
        <div class="section-title">Your Plans</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${state.plans.slice(0,3).map(p => `
            <div class="plan-card" onclick="App.viewPlan('${p.id}')">
              <div class="plan-card-inner ${p.color || 'grad-default'}">
                <div class="plan-card-name">${esc(p.name)}</div>
                <div class="plan-card-meta">${p.exercises.length} exercises</div>
                <div class="plan-card-days">
                  ${DAY_LABELS.map((d, i) => `<div class="day-dot ${(p.daysPerWeek||[]).includes(i)?'on':'off'}">${d}</div>`).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>` : ''}

      ${shownBadges.length > 0 ? `
      <div class="section">
        <div class="section-title">Badges</div>
        <div class="badges-scroll">
          ${shownBadges.map(b => {
            const unlocked = state.profile.badges?.includes(b.id);
            return `<div class="badge-chip ${unlocked?'unlocked':'locked'}">
              <span class="badge-icon">${b.icon}</span>
              <span class="badge-name">${b.name}</span>
            </div>`;
          }).join('')}
        </div>
      </div>` : ''}
    `;
  }

  // ── PLANS VIEW ─────────────────────────────────────────────────────────────
  function tmplPlans() {
    return `
      <div class="page-header">
        <div class="page-title">My Plans</div>
        <button class="fab" onclick="App.newPlan()">＋</button>
      </div>
      ${state.plans.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">🏋️</div>
          <p>No plans yet</p>
          <small>Tap + to create your first workout plan</small>
        </div>
      ` : `
        <div class="plan-list">
          ${state.plans.map(p => planCard(p)).join('')}
        </div>
      `}
    `;
  }

  function planCard(p) {
    const ex = p.exercises.length;
    const days = (p.daysPerWeek || []).map(i => DAY_NAMES[i]).join(', ') || 'No days set';
    return `
      <div class="plan-card" onclick="App.viewPlan('${p.id}')">
        <div class="plan-card-inner ${p.color || 'grad-default'}">
          <div class="plan-card-name">${esc(p.name)}</div>
          <div class="plan-card-meta">${ex} exercise${ex!==1?'s':''} · ${estimateDuration(p)} min</div>
          <div class="plan-card-days">
            ${DAY_LABELS.map((d, i) => `<div class="day-dot ${(p.daysPerWeek||[]).includes(i)?'on':'off'}">${d}</div>`).join('')}
          </div>
          <span class="plan-card-arrow">›</span>
        </div>
      </div>
    `;
  }

  // ── PLAN DETAIL ────────────────────────────────────────────────────────────
  function tmplPlanDetail() {
    const plan = state.plans.find(p => p.id === state.viewingPlanId);
    if (!plan) return '<div class="p-4">Plan not found.</div>';
    const days = (plan.daysPerWeek || []).map(i => DAY_NAMES[i]).join(', ') || 'No days set';
    return `
      <div class="detail-header ${plan.color || 'grad-default'}">
        <button class="detail-back" onclick="App.go('plans')">‹ Plans</button>
        <div class="detail-title">${esc(plan.name)}</div>
        <div class="detail-meta">${days} · ${estimateDuration(plan)} min estimated</div>
        <div class="detail-actions">
          <button class="btn btn-accent btn-lg" style="flex:1" onclick="App.startWorkout('${plan.id}')">▶ Start Workout</button>
          <button class="btn btn-ghost" onclick="App.editPlan('${plan.id}')">Edit</button>
        </div>
      </div>
      <div class="section">
        <div class="section-title">${plan.exercises.length} Exercise${plan.exercises.length!==1?'s':''}</div>
        <div class="exercise-list">
          ${plan.exercises.map(pe => {
            const ex = getExerciseById(pe.exerciseId);
            if (!ex) return '';
            return `
              <div class="exercise-item">
                <div class="exercise-color-bar ${getCategoryColor(ex.category)}"></div>
                <div class="exercise-item-body">
                  <div class="exercise-item-name">${ex.icon} ${esc(ex.name)}</div>
                  <div class="exercise-item-meta">${pe.sets} sets × ${pe.reps} ${ex.isTimedReps ? 'sec' : 'reps'} · ${pe.rest}s rest</div>
                  <div class="exercise-item-tags">
                    ${ex.muscles.map(m => `<span class="tag">${m}</span>`).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ── PLAN EDITOR ────────────────────────────────────────────────────────────
  function tmplPlanEditor() {
    const plan = state.editingPlan;
    const isNew = !state.plans.find(p => p.id === plan.id);
    const COLORS = ['grad-strength','grad-cardio','grad-boxing','grad-default'];
    const COLOR_LABELS = ['Purple','Orange','Red','Blue'];
    return `
      <div class="page-header">
        <button class="detail-back" onclick="App.cancelEdit()">‹ Back</button>
      </div>
      <div class="editor-form">
        <div class="input-group">
          <div class="input-label">PLAN NAME</div>
          <input class="input" id="plan-name" value="${esc(plan.name)}" placeholder="e.g. Daily Strength" maxlength="40"/>
        </div>

        <div class="input-group">
          <div class="input-label">COLOR</div>
          <div style="display:flex;gap:8px">
            ${COLORS.map((c, i) => `
              <button onclick="App.setPlanColor('${c}')"
                style="width:36px;height:36px;border-radius:50%;border:3px solid ${plan.color===c?'white':'transparent'};
                       background:${gradToColor(c)};cursor:pointer;" title="${COLOR_LABELS[i]}"></button>
            `).join('')}
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">TRAINING DAYS</div>
          <div class="days-selector">
            ${DAY_LABELS.map((d, i) => `
              <button class="day-btn ${(plan.daysPerWeek||[]).includes(i)?'selected':''}"
                      onclick="App.toggleDay(${i})">${d}</button>
            `).join('')}
          </div>
        </div>

        <div class="input-group">
          <div class="input-label">REST BETWEEN EXERCISES (sec)</div>
          <div class="input-number">
            <button onclick="App.adjPlanRest(-15)">−</button>
            <span id="plan-rest-val">${plan.restBetweenExercises || 90}</span>
            <button onclick="App.adjPlanRest(15)">+</button>
          </div>
        </div>

        <div>
          <div class="section-title">Exercises</div>
          <div id="editor-exercises" style="display:flex;flex-direction:column;gap:10px">
            ${plan.exercises.map((pe, i) => editorExerciseRow(pe, i)).join('')}
          </div>
          <button class="btn btn-ghost btn-block mt-3" onclick="App.openExerciseSelector()" style="margin-top:12px">
            + Add Exercise
          </button>
        </div>

        <div style="display:flex;gap:10px;padding-bottom:20px">
          <button class="btn btn-primary" style="flex:1" onclick="App.savePlan()">Save Plan</button>
          ${!isNew ? `<button class="btn btn-danger" onclick="App.deletePlan('${plan.id}')">Delete</button>` : ''}
        </div>
      </div>
    `;
  }

  function editorExerciseRow(pe, i) {
    const ex = getExerciseById(pe.exerciseId);
    if (!ex) return '';
    return `
      <div class="editor-exercise-item">
        <div class="editor-ex-header">
          <div class="editor-ex-name">${ex.icon} ${esc(ex.name)}</div>
          <button class="editor-ex-remove" onclick="App.removeExercise(${i})">✕</button>
        </div>
        <div class="editor-ex-settings">
          <div class="editor-setting">
            <label>SETS</label>
            <div class="input-number">
              <button onclick="App.adjExField(${i},'sets',-1)">−</button>
              <span id="ex-sets-${i}">${pe.sets}</span>
              <button onclick="App.adjExField(${i},'sets',1)">+</button>
            </div>
          </div>
          <div class="editor-setting">
            <label>${ex.isTimedReps ? 'SECS' : 'REPS'}</label>
            <div class="input-number">
              <button onclick="App.adjExField(${i},'reps',-${ex.isTimedReps?5:1})">−</button>
              <span id="ex-reps-${i}">${pe.reps}</span>
              <button onclick="App.adjExField(${i},'reps',${ex.isTimedReps?5:1})">+</button>
            </div>
          </div>
          <div class="editor-setting">
            <label>REST(s)</label>
            <div class="input-number">
              <button onclick="App.adjExField(${i},'rest',-15)">−</button>
              <span id="ex-rest-${i}">${pe.rest}</span>
              <button onclick="App.adjExField(${i},'rest',15)">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ── EXERCISE SELECTOR ──────────────────────────────────────────────────────
  function tmplExerciseSelector() {
    const cats = ['all', 'strength', 'cardio', 'boxing'];
    const filtered = state.exFilterCat === 'all' ? EXERCISES : EXERCISES.filter(e => e.category === state.exFilterCat);
    const alreadyIn = new Set((state.editingPlan?.exercises || []).map(e => e.exerciseId));
    return `
      <div class="page-header">
        <button class="detail-back" onclick="App.closeExerciseSelector()">‹ Back</button>
        <div class="page-title" style="font-size:20px">Add Exercise</div>
      </div>
      <div class="filter-tabs">
        ${cats.map(c => `
          <button class="filter-tab ${state.exFilterCat===c?'active':''}" onclick="App.setExFilter('${c}')">
            ${c === 'all' ? 'All' : c.charAt(0).toUpperCase()+c.slice(1)}
          </button>
        `).join('')}
      </div>
      <div class="exercise-grid">
        ${filtered.map(ex => `
          <div class="ex-card cat-${ex.category} ${alreadyIn.has(ex.id)?'selected':''}"
               onclick="App.previewExercise('${ex.id}')">
            <div class="ex-icon">${ex.icon}</div>
            <div class="ex-name">${esc(ex.name)}</div>
            <div class="ex-cat">${ex.category}</div>
            ${alreadyIn.has(ex.id) ? '<div style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--primary)">✓ Added</div>' : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── WORKOUT VIEW ───────────────────────────────────────────────────────────
  function tmplWorkout() {
    const w = state.workout;
    if (!w) return '';
    const pe = w.exercises[w.currentIdx];
    const ex = getExerciseById(pe.exerciseId);
    if (!ex) return '';

    const totalSets = w.exercises.reduce((s, e) => s + e.sets, 0);
    const doneSets  = w.exercises.slice(0, w.currentIdx).reduce((s, e) => s + e.sets, 0) + (w.currentSet - 1);
    const pct = Math.round(doneSets / totalSets * 100);

    const nextPe = w.exercises[w.currentIdx + 1] || null;
    const nextEx = nextPe ? getExerciseById(nextPe.exerciseId) : null;

    const pips = Array.from({length: pe.sets}, (_, i) => {
      const cls = i < w.currentSet - 1 ? 'done' : i === w.currentSet - 1 ? 'current' : '';
      return `<div class="set-pip ${cls}"></div>`;
    }).join('');

    return `
      <div class="workout-view">
        <div class="workout-topbar">
          <button class="workout-exit-btn" onclick="App.confirmExitWorkout()">✕ Exit</button>
          <div class="workout-progress-bar">
            <div class="workout-progress-fill" style="width:${pct}%"></div>
          </div>
          <div style="font-size:13px;font-weight:700;color:var(--text-muted)">${pct}%</div>
        </div>

        <div class="workout-anim-area">
          <div class="anim-glow"></div>
          <div class="anim-container">
            ${ex.video
              ? `<video id="ex-video" src="${ex.video}" autoplay loop muted playsinline></video>
                 ${!state.videoReady.get(ex.video) ? '<div class="video-spinner" id="video-spinner"></div>' : ''}`
              : getAnimation(ex.animKey)
            }
          </div>
        </div>

        <div class="workout-info">
          <div class="workout-ex-name">${esc(ex.name)}</div>
          <div class="workout-muscles">${ex.muscles.join(' · ')}</div>
          <div class="set-counter" style="margin-top:12px">
            ${pips}
            <span style="font-size:13px;color:var(--text-muted);font-weight:700;margin-left:6px">Set ${w.currentSet}/${pe.sets}</span>
          </div>
        </div>

        <div style="text-align:center">
          <div class="rep-display">${pe.reps}</div>
          <div class="rep-label">${ex.isTimedReps ? 'SECONDS' : 'REPS'}</div>
        </div>

        <div class="workout-controls">
          ${nextEx && w.currentIdx === w.exercises.length - 1 && w.currentSet === pe.sets ? '' :
            nextEx ? `
            <div class="next-preview">
              <span style="font-size:20px">${nextEx.icon}</span>
              <div>
                <div class="next-label">UP NEXT</div>
                <div class="next-name">${esc(nextEx.name)}</div>
              </div>
            </div>` : ''
          }
          <button class="btn btn-success btn-lg btn-block" id="done-set-btn" onclick="App.doneSet()">
            ✓ Done Set
          </button>
        </div>

        <!-- Rest overlay (hidden by default) -->
        <div class="rest-overlay" id="rest-overlay" style="display:none">
          <div class="rest-title">REST TIME</div>
          <div class="rest-ring">
            <svg viewBox="0 0 180 180" style="width:180px;height:180px">
              <circle id="rest-ring-bg" cx="90" cy="90" r="80" stroke-width="10" fill="none"/>
              <circle id="rest-ring-circle" cx="90" cy="90" r="80"
                stroke="#C8FF00" stroke-width="10" fill="none"
                stroke-dasharray="${2 * Math.PI * 80}"
                stroke-dashoffset="0"
                stroke-linecap="round"/>
            </svg>
            <div class="rest-ring-timer" id="rest-countdown">—</div>
          </div>
          <div class="rest-next" id="rest-next-label"></div>
          <button class="btn btn-ghost" style="margin-top:8px" onclick="App.skipRest()">Skip Rest ›</button>
        </div>
      </div>
    `;
  }

  // ── WORKOUT COMPLETE ───────────────────────────────────────────────────────
  function tmplWorkoutComplete() {
    const r = state.workoutResult;
    if (!r) return '';
    const lvl = getLevelInfo(state.profile.totalXp);
    return `
      <div class="complete-view">
        <div class="complete-emoji">🏆</div>
        <div class="complete-title">Workout Done!</div>
        <div class="complete-subtitle">Incredible effort, Champion!</div>

        <div class="xp-gained">
          <div class="xp-val">+${r.xpEarned}</div>
          <div class="xp-text">XP EARNED · Level ${lvl.level} ${lvl.name}</div>
        </div>

        <div class="complete-stats">
          <div class="complete-stat">
            <div class="c-val">${r.totalSets}</div>
            <div class="c-label">SETS</div>
          </div>
          <div class="complete-stat">
            <div class="c-val">${r.totalReps}</div>
            <div class="c-label">REPS</div>
          </div>
          <div class="complete-stat">
            <div class="c-val">${formatDuration(r.duration)}</div>
            <div class="c-label">TIME</div>
          </div>
        </div>

        ${r.newBadges && r.newBadges.length > 0 ? r.newBadges.map(b => `
          <div class="new-badge">
            <div class="badge-ico">${b.icon}</div>
            <div class="badge-info">
              <div class="badge-earned">🎉 BADGE UNLOCKED!</div>
              <div class="badge-n">${b.name}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${b.desc}</div>
            </div>
          </div>
        `).join('') : ''}

        <button class="btn btn-primary btn-lg btn-block" onclick="App.go('home')">Back to Home</button>
        <button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="App.go('plans')">View Plans</button>
      </div>
    `;
  }

  // ── PROFILE VIEW ───────────────────────────────────────────────────────────
  function tmplProfile() {
    const p = state.profile;
    const lvl = getLevelInfo(p.totalXp || 0);
    const avatarEmoji = ['🌱','⚡','🛡️','⚔️','🌟','👑'][Math.min(lvl.level - 1, 5)];
    return `
      <div class="profile-hero">
        <div class="avatar-ring">${avatarEmoji}</div>
        <div class="profile-name">Champion</div>
        <div class="profile-level">Level ${lvl.level} · ${lvl.name}</div>
        <div class="xp-bar-wrap" style="margin-top:12px">
          <div class="xp-bar-label">
            <span>${lvl.xpInLevel} / ${lvl.xpForLevel} XP to next level</span>
          </div>
          <div class="xp-bar-track">
            <div class="xp-bar-fill" style="width:${lvl.pct}%"></div>
          </div>
        </div>
      </div>

      <div class="profile-stats">
        <div class="profile-stat">
          <div class="p-icon">🏋️</div>
          <div class="p-val">${p.totalWorkouts || 0}</div>
          <div class="p-label">Workouts</div>
        </div>
        <div class="profile-stat">
          <div class="p-icon">💥</div>
          <div class="p-val">${formatNum(p.totalReps || 0)}</div>
          <div class="p-label">Total Reps</div>
        </div>
        <div class="profile-stat">
          <div class="p-icon">🔥</div>
          <div class="p-val">${p.streak || 0}</div>
          <div class="p-label">Day Streak</div>
        </div>
        <div class="profile-stat">
          <div class="p-icon">⚡</div>
          <div class="p-val">${formatNum(p.totalXp || 0)}</div>
          <div class="p-label">Total XP</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Badges (${(p.badges||[]).length}/${BADGES.length})</div>
        <div class="badges-grid">
          ${BADGES.map(b => {
            const unlocked = (p.badges||[]).includes(b.id);
            return `
              <div class="badge-item ${unlocked?'unlocked':'locked'}">
                <div class="bi-icon">${b.icon}</div>
                <div class="bi-name">${b.name}</div>
                <div class="bi-desc">${b.desc}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ── WORKOUT SESSION LOGIC ──────────────────────────────────────────────────
  function startWorkout(planId) {
    const plan = state.plans.find(p => p.id === planId);
    if (!plan || plan.exercises.length === 0) { toast('No exercises in this plan!'); return; }

    state.workout = {
      planId,
      exercises: plan.exercises.map(pe => ({ ...pe })),
      currentIdx: 0,
      currentSet: 1,
      xpEarned: 0,
      totalReps: 0,
      totalSets: 0,
      repsByExercise: {},
      startTime: Date.now()
    };
    navigate('workout');
  }

  function startWorkoutListeners() {
    const vid = document.getElementById('ex-video');
    if (!vid) return;
    vid.load();
    vid.play().catch(() => {});
    const spinner = document.getElementById('video-spinner');
    if (spinner) {
      vid.addEventListener('canplaythrough', () => spinner.remove(), { once: true });
    }
  }

  function doneSet() {
    const w = state.workout;
    if (!w) return;
    const pe = w.exercises[w.currentIdx];
    const ex = getExerciseById(pe.exerciseId);

    // Count XP and reps
    const repsThisSet = pe.reps;
    w.xpEarned += (ex.xpPerRep || 1) * repsThisSet;
    w.totalReps += repsThisSet;
    w.totalSets += 1;
    w.repsByExercise[pe.exerciseId] = (w.repsByExercise[pe.exerciseId] || 0) + repsThisSet;

    const moreSets = w.currentSet < pe.sets;
    const moreExercises = w.currentIdx < w.exercises.length - 1;

    if (!moreSets && !moreExercises) {
      // Workout done!
      w.xpEarned += 50; // completion bonus
      completeWorkout();
      return;
    }

    if (moreSets) {
      // Rest between sets, then same exercise
      startRest(pe.rest, () => {
        w.currentSet += 1;
        navigate('workout');
      });
    } else {
      // Move to next exercise
      const plan = state.plans.find(p => p.id === w.planId);
      const betweenRest = plan?.restBetweenExercises || 90;
      startRest(betweenRest, () => {
        w.currentIdx += 1;
        w.currentSet = 1;
        navigate('workout');
      });
    }
  }

  function startRest(seconds, onDone) {
    const overlay = document.getElementById('rest-overlay');
    const countdown = document.getElementById('rest-countdown');
    const ring = document.getElementById('rest-ring-circle');
    const nextLabel = document.getElementById('rest-next-label');
    if (!overlay) return;

    const w = state.workout;
    const pe = w.exercises[w.currentIdx];
    const moreSets = w.currentSet < pe.sets;

    if (nextLabel) {
      if (moreSets) {
        const ex = getExerciseById(pe.exerciseId);
        nextLabel.innerHTML = `Next up:<br><strong>${esc(ex?.name || '')}</strong>`;
      } else {
        const nextPe = w.exercises[w.currentIdx + 1];
        const nextEx = nextPe ? getExerciseById(nextPe.exerciseId) : null;
        nextLabel.innerHTML = nextEx ? `Next exercise:<br><strong>${nextEx.icon} ${esc(nextEx.name)}</strong>` : 'Last one!';
      }
    }

    overlay.style.display = 'flex';
    const total = seconds;
    const circumference = 2 * Math.PI * 80;
    let remaining = seconds;

    const tick = () => {
      if (countdown) countdown.textContent = remaining;
      if (ring) ring.style.strokeDashoffset = circumference * (1 - remaining / total);
      if (remaining <= 0) {
        clearInterval(state.restTimerId);
        overlay.style.display = 'none';
        onDone();
        return;
      }
      remaining--;
    };
    tick();
    clearInterval(state.restTimerId);
    state.restTimerId = setInterval(tick, 1000);
    state._restOnDone = onDone;
  }

  function skipRest() {
    clearInterval(state.restTimerId);
    const overlay = document.getElementById('rest-overlay');
    if (overlay) overlay.style.display = 'none';
    if (state._restOnDone) { state._restOnDone(); state._restOnDone = null; }
  }

  function completeWorkout() {
    const w = state.workout;
    clearInterval(state.restTimerId);

    const plan = state.plans.find(p => p.id === w.planId);
    const hasBoxing = w.exercises.some(pe => {
      const ex = getExerciseById(pe.exerciseId);
      return ex?.category === 'boxing';
    });

    const result = {
      planId: w.planId,
      planName: plan?.name || '',
      date: Date.now(),
      duration: Date.now() - w.startTime,
      xpEarned: w.xpEarned,
      totalReps: w.totalReps,
      totalSets: w.totalSets,
      repsByExercise: w.repsByExercise,
      hasBoxing,
    };

    const newBadges = addWorkoutToHistory(state.profile, result);
    result.newBadges = newBadges;
    state.workoutResult = result;
    state.workout = null;
    state.profile = loadProfile();

    if (newBadges.length > 0) toast(`Badge unlocked: ${newBadges[0].name}!`, 'accent');
    navigate('workout-complete');
  }

  function showDialog(title, message, onConfirm) {
    const overlay = document.getElementById('app-dialog');
    document.getElementById('dialog-title').textContent = title;
    document.getElementById('dialog-message').textContent = message;
    overlay.style.display = 'flex';

    const confirmBtn = document.getElementById('dialog-confirm');
    const cancelBtn = document.getElementById('dialog-cancel');

    function close() {
      overlay.style.display = 'none';
      confirmBtn.removeEventListener('click', handleConfirm);
      cancelBtn.removeEventListener('click', handleCancel);
    }
    function handleConfirm() { close(); onConfirm(); }
    function handleCancel() { close(); }

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
  }

  function confirmExitWorkout() {
    showDialog('Exit Workout', 'Your progress will be lost.', () => {
      clearInterval(state.restTimerId);
      state.workout = null;
      navigate('home');
    });
  }

  // ── PLAN CRUD ──────────────────────────────────────────────────────────────
  function viewPlan(id) {
    navigate('plan-detail', { viewingPlanId: id });
  }

  function newPlan() {
    state.editingPlan = {
      id: uuid(),
      name: 'New Plan',
      color: 'grad-strength',
      daysPerWeek: [],
      restBetweenExercises: 90,
      exercises: [],
      createdAt: Date.now()
    };
    navigate('plan-editor');
  }

  function editPlan(id) {
    const plan = state.plans.find(p => p.id === id);
    if (!plan) return;
    state.editingPlan = JSON.parse(JSON.stringify(plan)); // deep clone
    navigate('plan-editor');
  }

  function savePlan() {
    const nameEl = document.getElementById('plan-name');
    const name = nameEl ? nameEl.value.trim() : state.editingPlan.name;
    if (!name) { toast('Please enter a plan name'); return; }
    if (state.editingPlan.exercises.length === 0) { toast('Add at least one exercise'); return; }

    state.editingPlan.name = name;
    const idx = state.plans.findIndex(p => p.id === state.editingPlan.id);
    if (idx >= 0) state.plans[idx] = state.editingPlan;
    else state.plans.push(state.editingPlan);

    savePlans(state.plans);
    toast('Plan saved! 💪', 'success');
    navigate('plans');
  }

  function deletePlan(id) {
    showDialog('Delete Plan', 'This cannot be undone.', () => {
      state.plans = state.plans.filter(p => p.id !== id);
      savePlans(state.plans);
      toast('Plan deleted');
      navigate('plans');
    });
  }

  function cancelEdit() {
    navigate(state.viewingPlanId ? 'plan-detail' : 'plans');
  }

  function setPlanColor(color) {
    if (state.editingPlan) { state.editingPlan.color = color; navigate('plan-editor'); }
  }

  function toggleDay(i) {
    if (!state.editingPlan) return;
    const days = state.editingPlan.daysPerWeek || [];
    const idx = days.indexOf(i);
    if (idx >= 0) days.splice(idx, 1); else days.push(i);
    state.editingPlan.daysPerWeek = days.sort((a, b) => a - b);
    // Update buttons only
    document.querySelectorAll('.day-btn').forEach((btn, bi) => {
      btn.classList.toggle('selected', days.includes(bi));
    });
  }

  function adjPlanRest(delta) {
    if (!state.editingPlan) return;
    state.editingPlan.restBetweenExercises = Math.max(15, (state.editingPlan.restBetweenExercises || 90) + delta);
    const el = document.getElementById('plan-rest-val');
    if (el) el.textContent = state.editingPlan.restBetweenExercises;
  }

  function adjExField(idx, field, delta) {
    if (!state.editingPlan) return;
    const pe = state.editingPlan.exercises[idx];
    if (!pe) return;
    const min = field === 'sets' ? 1 : field === 'rest' ? 15 : 1;
    pe[field] = Math.max(min, pe[field] + delta);
    const el = document.getElementById(`ex-${field}-${idx}`);
    if (el) { el.textContent = pe[field]; el.classList.add('pop'); setTimeout(() => el.classList.remove('pop'), 300); }
  }

  function removeExercise(idx) {
    if (!state.editingPlan) return;
    state.editingPlan.exercises.splice(idx, 1);
    navigate('plan-editor');
  }

  function openExerciseSelector() {
    state.exFilterCat = 'all';
    navigate('exercise-selector');
  }

  function closeExerciseSelector() {
    navigate('plan-editor');
  }

  function setExFilter(cat) {
    state.exFilterCat = cat;
    navigate('exercise-selector');
  }

  function addExerciseToPlan(exId) {
    if (!state.editingPlan) return;
    const already = state.editingPlan.exercises.findIndex(e => e.exerciseId === exId);
    if (already >= 0) {
      state.editingPlan.exercises.splice(already, 1);
    } else {
      const ex = getExerciseById(exId);
      if (!ex) return;
      state.editingPlan.exercises.push({
        exerciseId: exId,
        sets: ex.defaultSets,
        reps: ex.defaultReps,
        rest: ex.defaultRest
      });
    }
    navigate('exercise-selector');
  }

  function previewExercise(exId) {
    if (!state.editingPlan) return;
    const ex = getExerciseById(exId);
    if (!ex) return;

    const alreadyIn = state.editingPlan.exercises.findIndex(e => e.exerciseId === exId);
    if (alreadyIn >= 0) {
      state.editingPlan.exercises.splice(alreadyIn, 1);
      navigate('exercise-selector');
      return;
    }

    const overlay = document.getElementById('ex-preview-dialog');
    const media = document.getElementById('ex-preview-media');
    document.getElementById('ex-preview-name').textContent = ex.name;

    if (ex.video) {
      media.innerHTML = `<video src="${ex.video}" autoplay loop muted playsinline></video>`;
    } else if (ex.animKey) {
      media.innerHTML = getAnimation(ex.animKey);
    } else {
      media.innerHTML = `<div class="ex-preview-emoji">${ex.icon}</div>`;
    }

    overlay.style.display = 'flex';

    const addBtn = document.getElementById('ex-preview-add');
    const cancelBtn = document.getElementById('ex-preview-cancel');

    function close() {
      overlay.style.display = 'none';
      const video = media.querySelector('video');
      if (video) { video.pause(); video.src = ''; }
      media.innerHTML = '';
      addBtn.removeEventListener('click', handleAdd);
      cancelBtn.removeEventListener('click', handleCancel);
    }
    function handleAdd() {
      close();
      addExerciseToPlan(exId);
    }
    function handleCancel() { close(); }

    addBtn.addEventListener('click', handleAdd);
    cancelBtn.addEventListener('click', handleCancel);
  }

  // ── GLOBAL EVENT LISTENERS ─────────────────────────────────────────────────
  function attachGlobalListeners() {
    // Nothing extra — all handled via onclick in templates
  }

  // ── HELPERS ────────────────────────────────────────────────────────────────
  function esc(str) {
    return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function formatNum(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
  }

  function formatDuration(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  function estimateDuration(plan) {
    let mins = 0;
    for (const pe of plan.exercises) {
      const ex = getExerciseById(pe.exerciseId);
      const repTime = ex?.isTimedReps ? pe.reps : pe.reps * 2.5;
      mins += pe.sets * (repTime + pe.rest) / 60;
    }
    mins += ((plan.exercises.length - 1) * (plan.restBetweenExercises || 90)) / 60;
    return Math.max(1, Math.round(mins));
  }

  function gradToColor(g) {
    return { 'grad-strength':'#C8FF00', 'grad-cardio':'#FFFFFF', 'grad-boxing':'#FF3333', 'grad-default':'#1A1A1A' }[g] || '#C8FF00';
  }

  function toast(msg, type = '') {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const t = document.createElement('div');
    t.className = `toast${type ? ' ' + type : ''}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  function go(view) { navigate(view); }

  // ── PUBLIC API ─────────────────────────────────────────────────────────────
  return {
    init,
    go,
    viewPlan,
    newPlan,
    editPlan,
    savePlan,
    deletePlan,
    cancelEdit,
    setPlanColor,
    toggleDay,
    adjPlanRest,
    adjExField,
    removeExercise,
    openExerciseSelector,
    closeExerciseSelector,
    setExFilter,
    addExerciseToPlan,
    previewExercise,
    startWorkout,
    doneSet,
    skipRest,
    confirmExitWorkout,
    toggleTheme,
  };
})();

// SVG Icons for nav
function iconHome() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`;
}
function iconPlans() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>`;
}
function iconProfile() {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`;
}
function iconSun() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}
function iconMoon() {
  return `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

document.addEventListener('DOMContentLoaded', () => App.init());
