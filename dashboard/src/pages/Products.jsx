import { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { productAPI } from '../services/api';
import {
  Plus,
  Edit3,
  Trash2,
  RefreshCw,
  X,
  Link2,
  Github,
  UploadCloud,
} from 'lucide-react';
import './Products.css';

const initialForm = {
  title: '',
  description: '',
  tech: '',
  github: '',
  demo: '',
  featured: false,
  imageUrl: '',
  imageFile: null,
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [formData, setFormData] = useState(initialForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data.products || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        tech: product.tech?.join(', ') || '',
        github: product.github || '',
        demo: product.demo || '',
        featured: product.featured || false,
        imageUrl: product.image || '',
        imageFile: null,
      });
    } else {
      setEditingProduct(null);
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(initialForm);
    setEditingProduct(null);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const buildPayload = () => {
    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('github', formData.github);
    payload.append('demo', formData.demo);
    payload.append('featured', formData.featured);

    if (formData.tech) {
      payload.append(
        'tech',
        JSON.stringify(
          formData.tech
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
        )
      );
    }

    if (formData.imageFile) {
      payload.append('image', formData.imageFile);
    } else if (formData.imageUrl) {
      payload.append('image', formData.imageUrl);
    }

    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = buildPayload();
      if (editingProduct) {
        await productAPI.update(editingProduct._id, payload);
        showToast('Product updated');
      } else {
        await productAPI.create(payload);
        showToast('Product created');
      }
      await fetchProducts();
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Unable to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productAPI.delete(productId);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      showToast('Product deleted');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Unable to delete product');
    }
  };

  return (
    <div className="page-shell">
      <div className="panel">
        <div className="panel-header">
          <div>
            <h2 className="panel-title">Projects</h2>
            <p className="panel-subtitle">
              Manage the projects displayed in your public portfolio.
            </p>
          </div>
          <div className="panel-actions">
            <button className="btn btn-secondary" onClick={fetchProducts}>
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="btn btn-primary" onClick={() => openModal()}>
              <Plus size={18} />
              Add Project
            </button>
          </div>
        </div>

        {error && <div className="inline-error">{error}</div>}
        {toast && <div className="inline-toast">{toast}</div>}

        {loading ? (
          <div className="route-loader">
            <div className="spinner-large"></div>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <Motion.article
                key={product._id}
                className="product-card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="product-card__media">
                  <img src={product.image} alt={product.title} />
                  {product.featured && <span className="chip chip-featured">Featured</span>}
                </div>
                <div className="product-card__body">
                  <div className="product-card__header">
                    <div>
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                    </div>
                    <div className="product-card__actions">
                      <button className="icon-btn" onClick={() => openModal(product)}>
                        <Edit3 size={18} />
                      </button>
                      <button className="icon-btn danger" onClick={() => handleDelete(product._id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="product-tech">
                    {product.tech?.map((stack) => (
                      <span key={stack} className="tech-pill">
                        {stack}
                      </span>
                    ))}
                  </div>
                  <div className="product-links">
                    {product.demo && (
                      <a href={product.demo} target="_blank" rel="noreferrer">
                        <Link2 size={16} />
                        Demo
                      </a>
                    )}
                    {product.github && (
                      <a href={product.github} target="_blank" rel="noreferrer">
                        <Github size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </Motion.article>
            ))}
            {!products.length && (
              <div className="empty-state">
                <UploadCloud size={48} />
                <h3>No projects found</h3>
                <p>Click “Add Project” to create your first showcase.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion.div
              className="modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="modal-header">
                <div>
                  <h3 className="modal-title">
                    {editingProduct ? 'Edit Project' : 'Add Project'}
                  </h3>
                  <p className="panel-subtitle">
                    {editingProduct ? 'Update project details' : 'Create a new portfolio item'}
                  </p>
                </div>
                <button className="icon-btn" onClick={closeModal}>
                  <X size={20} />
                </button>
              </div>

              {error && <div className="inline-error">{error}</div>}

              <form className="form-grid" onSubmit={handleSubmit}>
                <div className="form-group full">
                  <label>Project title</label>
                  <input
                    className="input"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Description</label>
                  <textarea
                    className="textarea"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="form-group full">
                  <label>Tech stack (comma separated)</label>
                  <input
                    className="input"
                    value={formData.tech}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tech: e.target.value }))}
                    placeholder="React, Node, MongoDB"
                  />
                </div>
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    className="input"
                    value={formData.github}
                    onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="form-group">
                  <label>Demo URL</label>
                  <input
                    className="input"
                    value={formData.demo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, demo: e.target.value }))}
                    placeholder="https://"
                  />
                </div>
                <div className="form-group">
                  <label>Image upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="input"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        imageFile: e.target.files?.[0] || null,
                      }))
                    }
                  />
                  <small>Upload a new cover image (optional)</small>
                </div>
                <div className="form-group">
                  <label>Or image URL</label>
                  <input
                    className="input"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                    placeholder="https://images.com/project.png"
                  />
                </div>
                <div className="form-group">
                  <label>Featured</label>
                  <select
                    className="select"
                    value={formData.featured ? 'true' : 'false'}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, featured: e.target.value === 'true' }))
                    }
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div className="modal-actions full">
                  <button type="button" className="btn btn-ghost" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : editingProduct ? 'Save changes' : 'Create project'}
                  </button>
                </div>
              </form>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;

