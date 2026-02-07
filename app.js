// Full CRUD with localStorage persistence (external JS)
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const addBtn = document.getElementById('addBtn');
  const listEl = document.getElementById('list');

  let items = JSON.parse(localStorage.getItem('items')) || [
    'Laptop Stand',
    'Wireless Mouse',
    'Ergonomic Keyboard',
    'USB-C Hub',
    'Noise-Cancelling Headphones',
    'External SSD 1TB',
    'LED Desk Lamp with Wireless Charging'
  ];

  function persist() {
    localStorage.setItem('items', JSON.stringify(items));
  }

  function render() {
    listEl.innerHTML = '';
    if (!items.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'No products yet. Add one above.';
      listEl.appendChild(empty);
      return;
    }

    items.forEach((text, idx) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;

      const icons = document.createElement('div');
      icons.className = 'icons';

      const editBtn = document.createElement('button');
      editBtn.className = 'edit';
      editBtn.title = 'Edit';
      editBtn.innerHTML = '\u270E'; // pencil
      editBtn.onclick = () => startEdit(idx, li);

      const delBtn = document.createElement('button');
      delBtn.className = 'delete';
      delBtn.title = 'Delete';
      delBtn.innerHTML = '\u{1F5D1}';
      delBtn.onclick = () => removeItem(idx);

      icons.appendChild(editBtn);
      icons.appendChild(delBtn);

      li.appendChild(span);
      li.appendChild(icons);
      listEl.appendChild(li);
    });
  }

  function addItem() {
    const v = input.value.trim();
    if (!v) return;
    items.unshift(v);
    persist();
    render();
    input.value = '';
    input.focus();
  }

  function removeItem(index) {
    if (!confirm('Delete this product?')) return;
    items.splice(index,1);
    persist();
    render();
  }

  function startEdit(index, li) {
    const old = items[index];
    li.innerHTML = '';
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = old;
    editInput.style.flex = '1';
    editInput.style.padding = '8px';
    editInput.style.marginRight = '8px';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.style.background = '#1e8888';
    saveBtn.style.color = '#fff';
    saveBtn.style.border = 'none';
    saveBtn.style.padding = '8px 10px';
    saveBtn.style.borderRadius = '6px';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.marginLeft = '8px';

    const holder = document.createElement('div');
    holder.style.display = 'flex';
    holder.style.width = '100%';
    holder.appendChild(editInput);
    holder.appendChild(saveBtn);
    holder.appendChild(cancelBtn);

    li.appendChild(holder);
    editInput.focus();

    saveBtn.onclick = () => {
      const nv = editInput.value.trim();
      if (!nv) { alert('Name cannot be empty'); editInput.focus(); return; }
      items[index] = nv;
      persist();
      render();
    };

    cancelBtn.onclick = () => { render(); };

    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') saveBtn.click();
      if (e.key === 'Escape') cancelBtn.click();
    });
  }

  // wire events
  addBtn.addEventListener('click', addItem);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addItem(); });

  // initial render
  render();
});
