import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import api from '../../api/axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'

const CATEGORIES = ['Men', 'Women', 'Kids', 'Accessories']
const SIZES_ALL = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const emptyProduct = {
  name: '', description: '', category: 'Men', price: '', discountPrice: '',
  stock: '', sizes: [], colors: [], featured: false,
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [saving, setSaving] = useState(false)
  const [colorInput, setColorInput] = useState({ name: '', hex: '#000000' })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get('/products', { params: { limit: 50 } })
      setProducts(res.data.products || [])
    } catch {}
    setLoading(false)
  }

  useEffect(() => {
    document.title = 'Admin Products — Velour'
    fetchProducts()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyProduct)
    setModal(true)
  }
  const openEdit = (product) => {
    setEditing(product._id)
    setForm({
      name: product.name, description: product.description,
      category: product.category, price: product.price,
      discountPrice: product.discountPrice || '',
      stock: product.stock, sizes: product.sizes || [],
      colors: product.colors || [], featured: product.featured,
    })
    setModal(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        name: form.name, description: form.description, category: form.category,
        price: Number(form.price), discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        stock: Number(form.stock), sizes: JSON.stringify(form.sizes),
        colors: JSON.stringify(form.colors), featured: form.featured,
      }
      if (editing) {
        await api.put(`/products/${editing}`, payload)
        toast.success('Product updated')
      } else {
        await api.post('/products', payload)
        toast.success('Product created')
      }
      setModal(false)
      fetchProducts()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product')
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`)
      toast.success('Product deleted')
      setDeleteConfirm(null)
      fetchProducts()
    } catch {
      toast.error('Failed to delete')
    }
  }

  const toggleSize = (size) => {
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter(s => s !== size) : [...f.sizes, size],
    }))
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-3xl text-white">Products</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-velour-accent text-white px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <FiPlus size={16} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="bg-gray-900 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Product</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Category</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Price</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Stock</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]?.url} alt={p.name} className="w-10 h-12 object-cover bg-gray-800" />
                      <span className="text-white text-xs font-medium line-clamp-1 max-w-[200px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{p.category}</td>
                  <td className="px-4 py-3 text-white">
                    ${p.discountPrice || p.price}
                    {p.discountPrice && <span className="text-gray-500 line-through text-xs ml-1">${p.price}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${p.stock < 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="text-gray-400 hover:text-velour-accent transition-colors">
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteConfirm(p._id)} className="text-gray-400 hover:text-red-400 transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-6 max-w-sm w-full mx-4">
              <h3 className="text-white font-semibold mb-2">Delete Product?</h3>
              <p className="text-gray-400 text-sm mb-4">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 border border-gray-700 text-gray-400 py-2 text-sm hover:bg-gray-800 transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 text-white py-2 text-sm hover:bg-red-600 transition-colors">Delete</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40" onClick={() => setModal(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[500px] bg-gray-900 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-white font-semibold">{editing ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setModal(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
                {[
                  { label: 'Product Name', key: 'name', type: 'text', required: true },
                  { label: 'Price ($)', key: 'price', type: 'number', required: true },
                  { label: 'Discount Price ($)', key: 'discountPrice', type: 'number' },
                  { label: 'Stock', key: 'stock', type: 'number', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      required={f.required}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:border-velour-accent transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:border-velour-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest block mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 text-sm focus:outline-none focus:border-velour-accent"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {SIZES_ALL.map(size => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-xs transition-colors ${
                          form.sizes.includes(size)
                            ? 'bg-velour-accent text-white'
                            : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest block mb-2">Colors</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={colorInput.name}
                      onChange={e => setColorInput(c => ({ ...c, name: e.target.value }))}
                      className="flex-1 bg-gray-800 border border-gray-700 text-white px-2 py-1.5 text-xs focus:outline-none"
                    />
                    <input
                      type="color"
                      value={colorInput.hex}
                      onChange={e => setColorInput(c => ({ ...c, hex: e.target.value }))}
                      className="w-10 h-9 bg-gray-800 border border-gray-700 cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (colorInput.name) {
                          setForm(f => ({ ...f, colors: [...f.colors, { ...colorInput }] }))
                          setColorInput({ name: '', hex: '#000000' })
                        }
                      }}
                      className="px-3 py-1.5 bg-velour-accent text-white text-xs hover:opacity-90"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.colors.map((c, i) => (
                      <div key={i} className="flex items-center gap-1 bg-gray-800 px-2 py-1 text-xs text-gray-300">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                        {c.name}
                        <button type="button" onClick={() => setForm(f => ({ ...f, colors: f.colors.filter((_, j) => j !== i) }))} className="text-gray-500 hover:text-red-400 ml-1">×</button>
                      </div>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
                    className="accent-velour-accent"
                  />
                  <span className="text-sm text-gray-300">Featured Product</span>
                </label>

                <div className="pt-4">
                  <p className="text-xs text-gray-500 mb-3">Note: Image upload requires Cloudinary to be configured.</p>
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-velour-accent text-white py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
