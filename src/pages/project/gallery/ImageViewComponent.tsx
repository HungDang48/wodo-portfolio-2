import React, { useEffect } from 'react';
import './ImageViewComponent.css';

interface ImageItem {
    src: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
}

interface ViewImageComponentsProps {
    isOpen: boolean;
    currentIndex: number;
    images: ImageItem[];
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
}

const ImageViewComponent: React.FC<ViewImageComponentsProps> = ({
    isOpen,
    currentIndex,
    images,
    onClose,
    onPrevious,
    onNext
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        onPrevious();
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        onNext();
    };

    const handleClose = () => {
        onClose();
    };

    const handleOverlayClick = () => {
        handleClose();
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen || currentIndex < 0 || currentIndex >= images.length) {
                return null;
            }

            switch (e.key) {
                case 'ArrowLeft':
                    onPrevious();
                    break;
                case 'ArrowRight':
                    onNext();
                    break;
                case 'Escape':
                    handleClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onPrevious, onNext]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen || !images[currentIndex]) {
        return null;
    }

    const currentImage = images[currentIndex];

    return (
        <div className="lightbox-overlay" onClick={handleOverlayClick}>
            <div className="lightbox-content" onClick={handleContentClick}>
                {/* Close Button */}
                <button className="close-btn" onClick={handleClose}>×</button>

                {/* Navigation Buttons */}
                <button className="nav-btn left" onClick={handlePrevious}>‹</button>
                <button className="nav-btn right" onClick={handleNext}>›</button>

                {/* Image Container */}
                <div className="lightbox-image-container">
                    <img
                        src={currentImage.src}
                        alt={currentImage.title}
                        className="lightbox-image"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.alt = "Không thể tải ảnh";
                            target.style.filter = "grayscale(100%)";
                        }}
                    />
                </div>

                {/* Info Panel */}
                <div className="lightbox-info">
                    <h3>{currentImage.title}</h3>
                    <p>{currentImage.description}</p>
                    <div className="lightbox-meta">
                        <span className="date">{formatDate(currentImage.date)}</span>
                        <div className="tags">
                            {currentImage.tags.map((tag, index) => (
                                <span key={index} className="tag">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Counter */}
                <div className="counter">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
};

export default ImageViewComponent;