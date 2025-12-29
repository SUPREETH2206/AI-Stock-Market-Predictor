'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface PasswordRequirement {
  label: string;
  met: boolean;
}

interface RegistrationFormProps {
  onSuccess?: () => void;
}

const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const passwordRequirements: PasswordRequirement[] = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains number', met: /\d/.test(password) },
    { label: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const getPasswordStrength = (): { label: string; color: string; percentage: number } => {
    const metCount = passwordRequirements.filter((req) => req.met).length;
    if (metCount === 0) return { label: '', color: '', percentage: 0 };
    if (metCount <= 2) return { label: 'Weak', color: 'bg-error', percentage: 33 };
    if (metCount <= 4) return { label: 'Medium', color: 'bg-warning', percentage: 66 };
    return { label: 'Strong', color: 'bg-success', percentage: 100 };
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(value);
    if (errors.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit Indian phone number';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (passwordRequirements.some((req) => !req.met)) {
      newErrors.password = 'Password does not meet all requirements';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    }, 1500);
  };

  const passwordStrength = getPasswordStrength();

  if (!isHydrated) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-glow-lg">
          <div className="space-y-6">
            <div className="h-10 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="h-12 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="h-12 bg-muted/50 rounded-md animate-pulse"></div>
            <div className="h-12 bg-muted/50 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-glow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-glow">
            <Icon name="SparklesIcon" size={32} className="text-primary-foreground" variant="solid" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join AI Stock Predictor today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-caption font-medium text-foreground mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none">
                <Icon name="PhoneIcon" size={20} />
                <span className="font-caption text-sm">+91</span>
                <span className="text-border">|</span>
              </div>
              <input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="9876543210"
                className={`w-full pl-24 pr-4 py-3 bg-input border ${
                  errors.phoneNumber ? 'border-error' : 'border-border'
                } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background font-caption transition-smooth`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-2 text-sm text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-caption font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Icon name="LockClosedIcon" size={20} />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Create a strong password"
                className={`w-full pl-12 pr-12 py-3 bg-input border ${
                  errors.password ? 'border-error' : 'border-border'
                } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background font-caption transition-smooth`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {password && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-caption text-muted-foreground">Password Strength:</span>
                  {passwordStrength.label && (
                    <span className={`text-xs font-caption font-semibold ${passwordStrength.color.replace('bg-', 'text-')}`}>
                      {passwordStrength.label}
                    </span>
                  )}
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{ width: `${passwordStrength.percentage}%` }}
                  ></div>
                </div>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Icon
                        name={req.met ? 'CheckCircleIcon' : 'XCircleIcon'}
                        size={16}
                        className={req.met ? 'text-success' : 'text-muted-foreground'}
                        variant="solid"
                      />
                      <span className={`text-xs font-caption ${req.met ? 'text-success' : 'text-muted-foreground'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors.password && (
              <p className="mt-2 text-sm text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-caption font-medium text-foreground mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Icon name="LockClosedIcon" size={20} />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Re-enter your password"
                className={`w-full pl-12 pr-12 py-3 bg-input border ${
                  errors.confirmPassword ? 'border-error' : 'border-border'
                } rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background font-caption transition-smooth`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
              </button>
            </div>
            {confirmPassword && password === confirmPassword && (
              <p className="mt-2 text-sm text-success flex items-center gap-1">
                <Icon name="CheckCircleIcon" size={16} variant="solid" />
                Passwords match
              </p>
            )}
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 mt-0.5">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => {
                    setTermsAccepted(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: '' }));
                    }
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 border-2 rounded ${
                    termsAccepted ? 'bg-primary border-primary' : 'border-border bg-input'
                  } transition-smooth flex items-center justify-center`}
                >
                  {termsAccepted && <Icon name="CheckIcon" size={14} className="text-primary-foreground" />}
                </div>
              </div>
              <span className="text-sm font-caption text-muted-foreground group-hover:text-foreground transition-smooth">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/80 font-medium">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-primary/80 font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms && (
              <p className="mt-2 text-sm text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} variant="solid" />
                {errors.terms}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-caption font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Creating Account...
              </>
            ) : (
              <>
                <Icon name="UserPlusIcon" size={20} variant="solid" />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm font-caption text-muted-foreground">
            Already have an account?{' '}
            <a href="/login" className="text-primary hover:text-primary/80 font-medium transition-smooth">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
