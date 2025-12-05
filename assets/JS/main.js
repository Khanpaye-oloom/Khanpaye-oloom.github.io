// Simple client-side include utility: loads HTML fragments into elements with `data-include` attribute
async function includeHTML() {
	const nodes = document.querySelectorAll('[data-include]');
	await Promise.all(Array.from(nodes).map(async (el) => {
		const url = el.getAttribute('data-include');
		try {
			const res = await fetch(url);
			if (!res.ok) throw new Error('Failed to load ' + url);
			const html = await res.text();
			el.innerHTML = html;
		} catch (err) {
			console.error(err);
		}
	}));
}

function initHeaderMenu() {
	const hamburgerBtn = document.getElementById('hamburgerBtn');
	const mobileNavContainer = document.getElementById('mobileNavContainer');
	const closeBtn = document.getElementById('closeBtn');
	const backdrop = document.querySelector('.mobile-nav-backdrop');
	if (!hamburgerBtn || !mobileNavContainer) return;

	const openMenu = () => { mobileNavContainer.classList.add('open'); mobileNavContainer.setAttribute('aria-hidden', 'false'); document.body.classList.add('menu-open'); };
	const closeMenu = () => { mobileNavContainer.classList.remove('open'); mobileNavContainer.setAttribute('aria-hidden', 'true'); document.body.classList.remove('menu-open'); };

	hamburgerBtn.addEventListener('click', openMenu);
	if (closeBtn) closeBtn.addEventListener('click', closeMenu);
	if (backdrop) backdrop.addEventListener('click', closeMenu);
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mobileNavContainer.classList.contains('open')) { closeMenu(); } });
}

document.addEventListener('DOMContentLoaded', async () => {
	await includeHTML();
	// after includes are added to DOM, initialize header menu and year-in-footer
	initHeaderMenu();
	const copyYear = document.getElementById('copy-year');
	if (copyYear) copyYear.textContent = new Date().getFullYear();
});

// Exported for debugging in console
window.__kp = { includeHTML, initHeaderMenu };

