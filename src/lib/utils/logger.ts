// src/utils/logger.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
	private static instance: Logger;
	private isDevMode: boolean;
	private logLevel: LogLevel;

	private constructor() {
		// Check if we're in development mode using Vite's env variable
		this.isDevMode = import.meta.env.DEV;
		// Default to 'debug' in dev mode, 'error' in production
		this.logLevel = this.isDevMode ? 'debug' : 'error';
	}

	public static getInstance(): Logger {
		if (!Logger.instance) {
			Logger.instance = new Logger();
		}
		return Logger.instance;
	}

	setLogLevel(level: LogLevel): void {
		this.logLevel = level;
	}

	private shouldLog(level: LogLevel): boolean {
		if (!this.isDevMode) {
			return level === 'error'; // Only log errors in production
		}

		const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
		const currentLevelIndex = levels.indexOf(this.logLevel);
		const requestedLevelIndex = levels.indexOf(level);

		return requestedLevelIndex >= currentLevelIndex;
	}

	getLogLevel(): LogLevel {
		return this.logLevel;
	}

	debug(...args: unknown[]): void {
		if (this.shouldLog('debug')) {
			console.debug('[DEBUG]', ...args);
		}
	}

	info(...args: unknown[]): void {
		if (this.shouldLog('info')) {
			console.info('[INFO]', ...args);
		}
	}

	warn(...args: unknown[]): void {
		if (this.shouldLog('warn')) {
			console.warn('[WARN]', ...args);
		}
	}

	error(...args: unknown[]): void {
		if (this.shouldLog('error')) {
			console.error('[ERROR]', ...args);
		}
	}

	table(data: unknown, level: LogLevel = 'debug'): void {
		if (this.shouldLog(level)) {
			console.table(data);
		}
	}

	group(label: string, level: LogLevel = 'debug'): void {
		if (this.shouldLog(level)) {
			console.group(label);
		}
	}

	groupEnd(): void {
		if (this.isDevMode) {
			console.groupEnd();
		}
	}

	// Utility method for component lifecycle logging
	lifecycle(
		componentName: string,
		event: string,
		level: LogLevel = 'debug',
		...args: unknown[]
	): void {
		if (this.shouldLog(level)) {
			console.debug(`[${componentName}] ${event}`, ...args);
		}
	}
}

// Export a singleton instance
export const logger = Logger.getInstance();

/*
logger.debug('This will show up in logLevel: debug/info/warn/error');
logger.info('This will show up in logLevel: info/warn/error');
logger.warn('This will show up in logLevel: warn/error');
logger.error('This will always show up');

logger.table({ data: 'example' }, 'info');

// Component lifecycle with specific log level
logger.lifecycle('MyComponent', 'onMount', 'info', { someData: 123 });
*/
