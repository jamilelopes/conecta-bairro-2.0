from . import db
from datetime import datetime, timezone
import uuid


def generate_uuid():
    return str(uuid.uuid4())


professional_categories = db.Table(
    'professional_categories',
    db.Column('professional_id', db.String(36), db.ForeignKey('professionals.id'), primary_key=True),
    db.Column('category_id', db.String(36), db.ForeignKey('categories.id'), primary_key=True)
)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='client')
    avatar_url = db.Column(db.String(500))
    phone = db.Column(db.String(20))
    address_state = db.Column(db.String(2))
    address_city = db.Column(db.String(100))
    address_district = db.Column(db.String(100))
    address_street = db.Column(db.String(200))
    address_number = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    professional = db.relationship('Professional', backref='user', uselist=False, lazy=True)


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    icon = db.Column(db.String(100))
    is_active = db.Column(db.Boolean, default=True)


class Professional(db.Model):
    __tablename__ = 'professionals'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), unique=True, nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(150))
    description = db.Column(db.Text)
    avatar_url = db.Column(db.String(500))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    instagram = db.Column(db.String(100))
    website = db.Column(db.String(200))
    registration_number = db.Column(db.String(50))
    state = db.Column(db.String(2))
    city = db.Column(db.String(100))
    district = db.Column(db.String(100))
    rating = db.Column(db.Float, default=0.0)
    reviews_count = db.Column(db.Integer, default=0)
    verified = db.Column(db.Boolean, default=False)
    available = db.Column(db.Boolean, default=True)
    featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    categories = db.relationship('Category', secondary=professional_categories, backref=db.backref('professionals', lazy=True), lazy=True)
    reviews = db.relationship('Review', backref='professional', lazy=True, order_by='Review.created_at.desc()')


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.String(36), primary_key=True, default=generate_uuid)
    professional_id = db.Column(db.String(36), db.ForeignKey('professionals.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    user_name = db.Column(db.String(100), nullable=False)
    user_avatar_url = db.Column(db.String(500))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    user = db.relationship('User', foreign_keys=[user_id], lazy=True)
