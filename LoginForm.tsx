'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';


interface FormData {
  phoneNumber: string;
  password: string;
}

interface FormErrors {
  phoneNumber?: string;
  password?: string;
  general?: string;
}

const LoginForm = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      if (formData.phoneNumber === '9876543210' && formData.password === 'trader123') {
        router.push('/dashboard');
      } else {
        setErrors({
          general: 'Invalid credentials. Use phone: 9876543210, password: trader123',
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-glow-lg">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded-lg"></div>
            <div className="h-12 bg-muted rounded-lg"></div>
            <div className="h-12 bg-muted rounded-lg"></div>
            <div className="h-12 bg-primary/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-glow-lg transition-smooth hover:shadow-glow-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-br from-primary to-secondary p-3 rounded-lg">
                <Icon name="SparklesIcon" size={32} className="text-primary-foreground" variant="solid" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-heading font-bold text-2xl text-foreground leading-none">AI Stock</span>
              <span className="font-heading font-medium text-lg text-primary leading-none">Predictor</span>
            </div>
          </div>
          <h1 className="text-2xl font-heading font-semibold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground font-caption">Sign in to access your trading dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="bg-error/10 border border-error/50 rounded-lg p-4 flex items-start gap-3">
              <Icon name="ExclamationCircleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" variant="solid" />
              <p className="text-sm text-error font-caption">{errors.general}</p>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-caption font-medium text-foreground">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-muted-foreground font-caption">+91</span>
              </div>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="9876543210"
                maxLength={10}
                className={`w-full pl-16 pr-4 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background font-caption transition-smooth ${
                  errors.phoneNumber ? 'border-error' : 'border-border'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Icon name="DevicePhoneMobileIcon" size={20} className="text-muted-foreground" />
              </div>
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-error font-caption flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-caption font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full pl-4 pr-12 py-3 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background font-caption transition-smooth ${
                  errors.password ? 'border-error' : 'border-border'
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-smooth"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-error font-caption flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
              />
              <span className="text-sm font-caption text-muted-foreground group-hover:text-foreground transition-smooth">
                Remember me
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm font-caption font-medium text-primary hover:text-primary/80 transition-smooth"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-lg font-caption font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <Icon name="ArrowRightOnRectangleIcon" size={20} variant="solid" />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm font-caption text-muted-foreground">
            New User?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/80 transition-smooth"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={16} className="text-success" variant="solid" />
              <span className="text-xs font-caption text-muted-foreground">Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="LockClosedIcon" size={16} className="text-success" variant="solid" />
              <span className="text-xs font-caption text-muted-foreground">256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs font-caption text-muted-foreground">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="text-primary hover:text-primary/80 transition-smooth">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary hover:text-primary/80 transition-smooth">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
